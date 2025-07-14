import { useAuthService } from "@/resources/services/auth-user/authentication.service";
import { useQuery } from "@tanstack/react-query"

export const useSession = () => {
    const AuthService = useAuthService();

    return useQuery({
        queryKey: ["session"],
        queryFn: async () => {
            const isValid = await AuthService.isSessionValid();
            return isValid;
        },
        refetchInterval: 2 * 60 * 60 * 1000,      
        refetchOnWindowFocus: true,
    });
};
