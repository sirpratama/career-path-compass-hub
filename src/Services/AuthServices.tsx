import api from "@/lib/api";
import { handleError } from "@/lib/ErrorHandler";
import { UserProfileToken, UserProfile } from "@/Models/User";

export const loginAPI = async (username: string, password: string) => {
    try {
        const response = await api.post<UserProfileToken>("/auth/login", {
            username,
            password,
        });
        return response;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            handleError(error);
            throw error;
        }
    }
};

export const registerAPI = async (email: string, username: string, password: string) => {
    try {
        const response = await api.post<UserProfileToken>("/auth/register", {
            email,
            username,
            password,
        });
        return response;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            handleError(error);
            throw error;
        }
    }
};

export const fetchResultsAPI = async (): Promise<Record<string, number> | null> => {
    try {
        const response = await api.get<{ savedResults: Record<string, number> | null }>("/results");
        return response.data?.savedResults || null;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        handleError(error);
        return null;
    }
};

export const saveResultsAPI = async (careerScores: Record<string, number>) => {
    try {
        const response = await api.post("/results", { careerScores });
        return response;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            handleError(error);
            throw error;
        }
    }
};

export const refreshToken = async () => {
    try {
        const response = await api.post<{token: string}>("/auth/refresh-token");
        return response.data.token;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await api.post("/auth/logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    } catch (error) {
        handleError(error);
    }
};