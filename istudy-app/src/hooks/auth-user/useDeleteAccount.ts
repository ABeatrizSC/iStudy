import { PATH } from "@/constants/path";
import { useNotification } from "@/hooks/notification";
import { useAuthService } from "@/resources/services/auth-user/authentication.service";
import { DeleteAccount } from "@/resources/services/auth-user/user.resource";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useDeleteAccount = () => {
    const authService = useAuthService();
    const notification = useNotification();
    const router = useRouter();

    return useMutation({
        mutationFn: (deleteAccount: DeleteAccount) => authService.deleteUserAccount(deleteAccount),

        onSuccess: (data: string) => {
            notification.notify(data || "Account deleted successfully.", "success");
            router.push(PATH.REGISTER);
        },
    });
};