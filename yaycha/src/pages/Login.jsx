import {
    Alert,
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";

import {Link, useNavigate} from "react-router-dom";
import {useApp} from "../ThemedApp";

const Login = () => {
    const navigate = useNavigate();
    const {setAuth} = useApp();

    return (
        <Box>
            <Typography variant="h3">Login</Typography>

            <Alert severity="warning" sx={{ mt: 2 }}>All fields required</Alert>

            <form onSubmit={e => {
                e.preventDefault();
                setAuth(true);
                navigate("/profile/1");
            }}>
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
                    <TextField placeholder="Username" fullWidth/>
                    <TextField type="password" placeholder="Password" fullWidth/>
                    <Button type="submit" variant="contained" fullWidth>
                        Login
                    </Button>
                    <Typography>If you don't have an account.<Link to="/register">Here is to Register.</Link></Typography>
                </Box>
            </form>
        </Box>
    );
};

export default Login;