import { Box, Button, TextField, Alert } from "@mui/material";

import Item from "../components/Item";

import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, useApp } from "../ThemedApp";
import { postComment } from "../libs/fetcher";
import { useRef } from "react";

const api = import.meta.env.VITE_API;

const Comments = () => {
  const { auth } = useApp();
  const { id } = useParams();
  const navigate = useNavigate();
  const contentInput = useRef();

  const { setGlobalMsg } = useApp();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await fetch(`${api}/content/posts/${id}`);
      return res.json();
    },
  });

  const addComment = useMutation({
    mutationFn: (content) => {
      postComment(content, id);
    },
    onSuccess: async (comment) => {
      await queryClient.cancelQueries("comments");
      await queryClient.setQueryData("comments", (old) => {
        old.comments = [...old.comments, comment];
        return { ...old };
      });
      setGlobalMsg("A comment added");
    },
  });

  const removePost = useMutation({
    mutationFn: async (id) => {
      await fetch(`${api}/content/posts/${id}`, {
        method: "DELETE",
      });
      navigate("/");
      setGlobalMsg("A post Deleted");
    },
  });

  const removeComment = useMutation({
    mutationFn: async (id) => {
      await fetch(`${api}/content/comments/${id}`, {
        method: "DELETE",
      });
    },
    onMutate: async (id) => {
      queryClient.cancelQueries({ queryKey: ["comments"] });
      queryClient.setQueryData(["comments"], (old) => {
        old.comments = old.comments.filter((comment) => comment.id !== id);
        return { ...old };
      });
      setGlobalMsg("A comment deleted");
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
      <Item primary item={data} remove={removePost.mutate} />
      {data?.comments?.map((comment) => {
        return (
          <Item
            comment
            key={comment.id}
            item={comment}
            remove={removeComment.mutate}
          />
        );
      })}

      {auth && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const content = contentInput.current.value;
            if (!content) return false;

            addComment.mutate(content);
            e.currentTarget.reset();
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 3,
            }}>
            <TextField
              multiline
              placeholder="Your Comment"
              inputRef={contentInput}
            />
            <Button type="submit" variant="contained">
              Reply
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default Comments;
