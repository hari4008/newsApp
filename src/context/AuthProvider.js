import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import {useNavigate } from 'react-router-dom/dist';

const AuthContext = React.createContext(null);
export const useAuth = () => useContext(AuthContext)

const ContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();
    const loginAction = async (values) => {
        try {
            console.log("data",values)
            const response = await axios.post("http://localhost:5002/login",{values});
            console.log("res",response)
            console.log("response.email",response.data.email)

            // const res = await response.json();
            if (response.data) {
                setUser(response.data.email);
                setToken(response.token);
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
                return;
            }
            throw new Error(response.message);
        } catch (err) {
            console.error(err);
        }
    }
    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        navigate("/login");
      };
    console.log("----------------",user);
    return(
        <AuthContext.Provider
           value ={{
            user,
            loginAction,
            logOut
           }}
        >
         {children}
        </AuthContext.Provider>
    );
}
export default ContextProvider;