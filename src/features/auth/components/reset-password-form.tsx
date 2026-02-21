import FullLoading from "@/shared/components/full-loading";
import { Button } from "@/shared/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import { useResetMutation } from "../api/auth.api";
import {
  resetPasswordDefaultValues,
  resetPasswordSchema,
  ResetPasswordValues,
} from "../schemas/reset-password.schema";
export const ResetPasswordForm = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const [resetPassword, { isLoading }] = useResetMutation();
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: resetPasswordDefaultValues,
  });
  const handleResetPassword: SubmitHandler<ResetPasswordValues> = async ({
    password,
  }) => {
    try {
      if (!token) return;
      await resetPassword({
        token,
        password,
      });
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoading) return <FullLoading />;
  return (
    <div>
      <p>Khôi phục mật khẩu</p>
      <p>Nếu như bạn quên mật khẩu đăng nhập!</p>
      <p>Vui lòng email đã đăng ký để thực hiện khôi phục mật khẩu</p>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleResetPassword)}>
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mat khau</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nhap lai mat khau</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Khôi phục mật khẩu</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
