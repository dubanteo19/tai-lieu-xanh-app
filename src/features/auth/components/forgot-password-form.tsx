import FullLoading from "@/shared/components/FullLoading";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useForgotMutation } from "../api/authApi";
import { forgotPasswordSchema } from "../schemas/forgot-password.schema";
import { ForgotPasswordRequest } from "../types/auth.request";
export const ForgotPasswordForm = () => {
  const [forgotPassword, { isLoading }] = useForgotMutation();
  const form = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const handleForgotPassword: SubmitHandler<ForgotPasswordRequest> = async (
    data,
  ) => {
    try {
      await forgotPassword({ email: data.email }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoading) return <FullLoading />;
  return (
    <div>
      <h4>Quên mật khẩu</h4>
      <p>Nếu như bạn quên mật khẩu đăng nhập!</p>
      <p>Vui lòng email đã đăng ký để thực hiện khôi phục mật khẩu</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleForgotPassword)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Khôi phục mật khẩu</Button>
        </form>
      </Form>
    </div>
  );
};
