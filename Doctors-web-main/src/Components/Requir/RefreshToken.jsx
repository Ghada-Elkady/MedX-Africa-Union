import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../Context/Context";
import Cookies from "universal-cookie";
import Loading from "../Loading/Loading";

const RefreshToken = () => {
    const [loading, setLoading] = useState(true);
    const user = useContext(User);
    const cookie = new Cookies();

    const refreshToken = cookie.get("refresh");
    const userData = cookie.get("user");


    useEffect(() => {
        const refreshAuthToken = async () => {
            if (!refreshToken) {
                console.warn("No refresh token found.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/auth/refresh/",
                    { refresh_token: refreshToken },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const newAccess = response.data.access_token;

               
                
                // Update context
                user.setAuth({
                    accessToken: newAccess,
                    refreshToken: refreshToken,
                    user: userData
                });
                
                // Update cookies
                cookie.set("Bearer", newAccess, {
                    path: "/"
                });
                console.log(response)



            } catch (error) {
                console.error("Error refreshing token:", error);
            } finally {
                setLoading(false);
            }
        };

        refreshAuthToken();
    }, []);

    return loading ? <Loading /> : <Outlet />;
};

export default RefreshToken;
