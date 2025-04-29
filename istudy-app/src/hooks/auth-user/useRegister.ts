import { useNotification } from "@/hooks/notification";
import { useAuthService } from "@/resources/services/auth-user/authentication.service";
import { User } from "@/resources/services/auth-user/user.resource";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
    const authService = useAuthService();
    const notification = useNotification();

    return useMutation({
        mutationFn: (newUser: User) => authService.save(newUser),
        onSuccess: () => {
            notification.notify("User created successfully!", "success")
        },
        retry: false
    });
};