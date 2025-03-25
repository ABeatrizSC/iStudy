import { useAuthService } from "@/resources/services/auth-user/authentication.service";
import { UserCredentials } from "@/resources/services/auth-user/user.resource";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogin = () => {
    const authService = useAuthService();
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: UserCredentials) => authService.login(credentials),
        onSuccess: () => {
            router.push("/")
            queryClient.invalidateQueries({ queryKey: ["session"] });
        },
        retry: false
    });
};