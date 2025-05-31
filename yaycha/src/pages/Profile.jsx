import { Alert, Avatar, Box, Typography } from "@mui/material";

import { pink } from "@mui/material/colors";

import { useParams } from "react-router-dom";
import { fetchUser } from "../libs/fetcher";
import { useQuery } from "@tanstack/react-query";
import Item from "../components/Item";

const Profile = () => {
  const { id } = useParams();

  const {
    isLoading: userLoading,
    isError: userError,
    error,
    data: userData,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => fetchUser(id),
  });

  const {
    isLoading: postsLoading,
    isError: postsError,
    data: postsData,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(`${api}/content/posts`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  if (userError || postsError) {
    return (
      <Box>
        <Alert severity="warning">{error.message}</Alert>
      </Box>
    );
  }

  if (userLoading || postsLoading) {
    return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
  }

  if (!userData) {
    return <Box sx={{ textAlign: "center" }}>No user data found.</Box>;
  }

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "banner",
          height: 150,
          borderRadius: 4,
        }}></Box>
      <Box
        sx={{
          mb: 4,
          marginTop: "-60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            bgcolor: pink[500],
          }}
        />
        <Box sx={{ textAlign: "center" }}>
          <Typography>{userData.name}</Typography>
          <Typography sx={{ fontSize: "0.8em", color: "text.fade" }}>
            {userData.bio}
          </Typography>
        </Box>
      </Box>
      <Box>
        {postsData
          ?.filter((item) => item.id === userData.id)
          .map((item) => (
            <Item key={item.id} item={item} />
          ))}
      </Box>
    </Box>
  );
};

export default Profile;
