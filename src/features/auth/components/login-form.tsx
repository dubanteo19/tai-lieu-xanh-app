import { ROUTES } from "@/app/router/routes";
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
import { NavLink } from "react-router-dom";
import { useLoginMutation } from "../api/auth.api";
import {
  loginDefaultValues,
  loginSchema,
  LoginValues,
} from "../schemas/login.schema";
export const LoginForm = () => {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });
  const [login, { isLoading, error }] = useLoginMutation();
  const handleLogin: SubmitHandler<LoginValues> = async (data) => {
    try {
      await login(data).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex-center pt-2 w-full"
        onSubmit={form.handleSubmit(handleLogin)}
      >
        {isLoading && <FullLoading />}
        <div className="flex-center flex-col p-4  gap-4 max-w-[600px]  border-4 rounded-2xl my-auto mx-auto">
          <h4 className="text-center font-bold text-2xl">Đăng nhập</h4>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Mật khẩu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Đăng nhập</Button>
          {error && <p>Thông tin đăng nhập không chính xác</p>}
          <NavLink to={ROUTES.FORGOT_PASSWORD}>Quên mật khẩu?</NavLink>
          <NavLink to={ROUTES.REGISTER}>Đăng ký</NavLink>
        </div>
      </form>
    </Form>
  );
};
