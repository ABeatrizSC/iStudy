import { useAuthService } from "@/resources/services/auth-user/authentication.service";
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

export const useSession = () => {
    const AuthService = useAuthService();
    const router = useRouter();

    return useQuery({
        queryKey: ["session"],
        queryFn: async () => {
            const isValid = await AuthService.isSessionValid();
            if (!isValid) {
                router.push("/login");
            }
            return isValid;
        },
        staleTime: 30 * 60 * 1000,
    });
};
