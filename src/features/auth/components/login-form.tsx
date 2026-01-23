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
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/authApi";
import { setAuthToken } from "../authSlice";
import { loginSchema } from "../schemas/login.schema";
import { LoginRequest } from "../types/auth.request";
export const LoginForm = () => {
  const form = useForm<LoginRequest>({ resolver: zodResolver(loginSchema) });
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setAuthToken(res));
      navigate("/user");
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
