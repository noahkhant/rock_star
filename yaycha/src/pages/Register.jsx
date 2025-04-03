import {
    Alert,
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import {useApp} from "../ThemedApp";

const Register = () => {
    const navigate = useNavigate();
    const {setAuth} = useApp();

    return(
        <Box>
            <Typography variant="h3">Register</Typography>
            <Alert severity="warning" sx={{ mt: 2 }}>All field is required</Alert>

            <form onSubmit={e => {
                e.preventDefault();
                setAuth(true);
                navigate("/profile/1");
            }}>
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
                    <TextField placeholder="Name" fullWidth/>
                    <TextField placeholder="Username" fullWidth/>
                    <TextField placeholder="Biography" fullWidth/>
                    <TextField type="password" placeholder="Password" fullWidth/>

                    <Button type="submit" variant="contained" fullWidth>
                        Register
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default Register;