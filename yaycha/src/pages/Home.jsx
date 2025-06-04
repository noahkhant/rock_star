import { Alert, Box } from "@mui/material";

import Form from "../components/Form";
import Item from "../components/Item";

import { useApp } from "../ThemedApp";
import { useQuery, useMutation } from "@tanstack/react-query";

import { queryClient } from "../ThemedApp";

const api = import.meta.env.VITE_API;

const Home = () => {
  const { auth, showForm, setGlobalMsg } = useApp();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(`${api}/content/posts`);
      return res.json();
    },
  });

  const remove = useMutation({
    mutationFn: async (id) => {
      await fetch(`${api}/content/posts/${id}`, {
        method: "DELETE",
      });
    },
    onMutate: (id) => {
      queryClient.cancelQueries({ queryKey: ["posts"] });
      queryClient.setQueryData(["posts"], (old) => {
        old.filter((item) => item.id != id);
      });
      setGlobalMsg("A post Deleted!");
    },
  });

  const add = useMutation({
    mutationFn: async (content) => postPost(content),
    onSuccess: async (post) => {
      await queryClient.cancelQueries("posts");
      await queryClient.setQueryData("posts", (old) => [post, ...old]);
      setGlobalMsg("A post added");
    },
  });

  if (isError) {
    return (
      <Box>
        <Alert severity="warning">{error.message}</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
  }
  return (
    <Box>
      {showForm && auth && <Form add={add} />}

      {data?.map((item) => {
        return <Item key={item.id} item={item} remove={remove.mutate} />;
      })}
    </Box>
  );
};

export default Home;
