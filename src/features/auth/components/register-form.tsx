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
import { NavLink, useNavigate } from "react-router-dom";
import {
  registerDefaultValues,
  registerSchema,
  RegisterValues,
} from "../schemas/register.schema";
import { useRegisterMutation } from "../api/auth.api";
export const RegisterForm = () => {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });
  const [registerAccount, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const handleRegister: SubmitHandler<RegisterValues> = async (data) => {
    try {
      const res = await registerAccount(data).unwrap();
      if (res.email) {
        navigate("/login", {
          state: {
            message:
              "Đăng ký tài khoản thành công, vui lòng kích hoạt tài khoản trên email của tài khoản",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <FullLoading />;
  return (
    <div>
      <p>Đăng ký tài khoản</p>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)}>
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
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ho va ten</FormLabel>
                  <FormControl>
                    <Input placeholder="Ho va ten" {...field} />
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
            <Button type="submit">Đăng ký</Button>
          </form>
        </Form>
        <Button>Google</Button>
        <p>Đã có tài khoản?</p>
        <NavLink to={ROUTES.LOGIN}>Đăng nhập</NavLink>
      </div>
    </div>
  );
};
