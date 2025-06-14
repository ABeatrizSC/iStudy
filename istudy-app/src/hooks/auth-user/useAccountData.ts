import { useAuthService } from "@/resources/services/auth-user/authentication.service";
import { useQuery } from "@tanstack/react-query";

export const useAccountData = () => {
    const authService = useAuthService();

    return useQuery({
        queryFn: () => authService.getAccountDetails(),
        queryKey: ['account-data'],
    });
};