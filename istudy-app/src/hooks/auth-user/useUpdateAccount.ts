import { useAuthService } from "@/resources/services/auth-user/authentication.service";
import { UpdateAccount } from "@/resources/services/auth-user/user.resource";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "../notification";

export const useUpdateAccount = () => {
    const queryClient = useQueryClient();
    const authService = useAuthService();
    const notification = useNotification();

    return useMutation({
        mutationFn: (updateAccount: UpdateAccount) => authService.updateUserAccount(updateAccount),
        onSuccess: (data: string) => {
            queryClient.invalidateQueries({ queryKey: ["account-data"] });
            notification.notify(data || "Account updated successfully.", "success");
        },
    });
};