import { useContext } from "react";
import { User } from "../Context/Context";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const userContext = useContext(User);
    return userContext.auth.accessToken && userContext.auth.refreshToken ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;