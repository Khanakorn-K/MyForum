import { signIn } from "next-auth/react";

export const useLogin = () => {
    const handleGoogleLogin = async () => {
        await signIn("google", { callbackUrl: "/" });
    };

    return {
        handleGoogleLogin,
    };
};
