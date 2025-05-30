import { Alert, Avatar, Box, Typography } from "@mui/material";

import { pink } from "@mui/material/colors";

import { useParams } from "react-router-dom";
import { fetchUser } from "../libs/fetcher";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { id } = useParams();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => fetchUser(id),
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

  if (!data) {
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
          <Typography>{data.name}</Typography>
          <Typography sx={{ fontSize: "0.8em", color: "text.fade" }}>
            {data.bio}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
