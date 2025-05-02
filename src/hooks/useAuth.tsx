import { UserProfile } from "@/Models/User";
import { loginAPI, registerAPI, logout as logoutAPI, saveResultsAPI, fetchResultsAPI } from "@/Services/AuthServices";
import React, { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "@/lib/api";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, username: string, password: string) => Promise<void>;
    loginUser: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isLoggedIn: () => boolean;
    saveUserResults: (careerScores: Record<string, number>) => Promise<boolean>;
    isLoadingAuth: boolean;
}

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {

    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    const fetchUserData = useCallback(async (currentToken: string) => {
        setIsLoadingAuth(true);
        try {
            const storedUser = localStorage.getItem("user");
            let userProfile = storedUser ? JSON.parse(storedUser) : null;

            if (userProfile) {
                api.defaults.headers.common["Authorization"] = "Bearer " + currentToken;

                const resultsRes = await fetchResultsAPI();
                userProfile.savedResults = resultsRes;

                setUser(userProfile);
                setToken(currentToken);
            } else {
                logout();
            }
        } catch (error) {
            console.error("Failed to fetch user data or results:", error);
            logout();
        } finally {
            setIsLoadingAuth(false);
        }
    }, [navigate]);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            fetchUserData(storedToken);
        } else {
            setIsLoadingAuth(false);
        }
    }, [fetchUserData]);

    const registerUser = async (email: string, username: string, password: string) => {
        try {
            const res = await registerAPI(email, username, password);
            if (res) {
                localStorage.setItem("token", res?.data.token);
                const userObj = {
                    userName: res?.data.userName,
                    email: res?.data.email,
                    savedResults: null
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.token!);
                setUser(userObj!);
                api.defaults.headers.common["Authorization"] = "Bearer " + res?.data.token;
                toast.success("Registration successful!");
                navigate("/login");
            }
        } catch (error) {
            throw error;
        }
    };

    const loginUser = async (username: string, password: string) => {
        setIsLoadingAuth(true);
        try {
            const loginRes = await loginAPI(username, password);
            if (loginRes && loginRes.data.token) {
                const currentToken = loginRes.data.token;
                localStorage.setItem("token", currentToken);
                localStorage.setItem("user", JSON.stringify({
                    userName: loginRes.data.userName,
                    email: loginRes.data.email,
                }));
                setToken(currentToken);
                api.defaults.headers.common["Authorization"] = "Bearer " + currentToken;

                await fetchUserData(currentToken);

                setUser(currentUser => {
                    if (currentUser?.savedResults) {
                        toast.success("Login successful! Redirecting to results...");
                        navigate("/results");
                    } else {
                        toast.success("Login successful!");
                        navigate("/");
                    }
                    return currentUser;
                });

            }
        } catch (error) {
            setIsLoadingAuth(false);
            throw error;
        }
    };

    const isLoggedIn = () => {
        return !!user && !!token && !isLoadingAuth;
    };

    const logout = () => {
        try {
            logoutAPI();
        } catch (error) {
            console.error("Logout API call failed:", error);
        } finally {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            delete api.defaults.headers.common["Authorization"];
            setIsLoadingAuth(false);
            navigate("/login");
        }
    };

    const saveUserResults = async (careerScores: Record<string, number>): Promise<boolean> => {
        if (!user || !token) {
            toast.error("You must be logged in to save results.");
            return false;
        }
        try {
            await saveResultsAPI(careerScores);
            setUser(prevUser => prevUser ? { ...prevUser, savedResults: careerScores } : null);
            toast.success("Results saved successfully!");
            return true;
        } catch (error) {
            toast.error("Failed to save results. Please try again.");
            console.error("Error saving results:", error);
            return false;
        }
    };

    return (
        <UserContext.Provider
            value={{
                loginUser,
                user,
                token,
                logout,
                isLoggedIn,
                registerUser,
                saveUserResults,
                isLoadingAuth
            }}
        >
            {!isLoadingAuth ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);
