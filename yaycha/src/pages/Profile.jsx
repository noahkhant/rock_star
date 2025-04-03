import { Avatar, Typography, Box } from "@mui/material";

import { pink } from "@mui/material/colors";

import Item from "../components/Item";

const Profile = () => {
    return (
        <Box>
            <Box sx={{ bgcolor: "banner", height: 150, borderRadius: 4 }}></Box>
            <Box 
                sx={{ 
                    mb: 4,
                    marginTop: "-60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1
                }}>

                <Avatar sx={{ width: 100, height: 100, bgcolor: pink[500] }}/>

                <Box sx={{ textAlign: "center" }}>
                    <Typography>Noah</Typography>
                    <Typography sx={{ fontSize: "0 0.8em", color: "text.fade" }}>
                        Noah's profile bio content here
                    </Typography>
                </Box>
            </Box>

            <Item key={1} remove={() => {}} item={{ id: 1, content: "A post content from Noah", name: "Noah"}}/>
        </Box>
    );
};

export default Profile;