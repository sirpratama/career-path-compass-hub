export type UserProfileToken = {
    userName: string;
    email: string;
    token: string;
};

export type UserProfile = {
    userName: string;
    email: string;
    savedResults?: Record<string, number> | null;
};