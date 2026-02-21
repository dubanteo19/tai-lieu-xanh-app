import { ROUTES } from "@/app/router/routes";
import FullLoading from "@/shared/components/full-loading";
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
import { useRegisterMutation } from "../api/auth.api";
import {
  registerDefaultValues,
  registerSchema,
  RegisterValues,
} from "../schemas/register.schema";
export const RegisterForm = () => {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });
  const [registerAccount, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();
  const handleRegister: SubmitHandler<RegisterValues> = async (data) => {
    try {
      const res = await registerAccount(data).unwrap();
      if (res.email) {
        navigate(ROUTES.LOGIN);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <FullLoading />;
  return (
    <div className="flex-center flex-col   px-12  py-8  gap-4  border-1 rounded-2xl my-auto mx-auto">
      <h4 className="text-center font-bold text-2xl">Đăng ký tài khoản</h4>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegister)}
            className="gap-2 flex-center flex-col"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Eg: nguyenvana@gmail.com" {...field} />
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
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Eg: Nguyễn Văn A" {...field} />
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
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
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
                  <FormLabel>Nhập lại mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Đăng ký
            </Button>

            {error && (
              <span className="text-destructive">
                Thông tin đăng nhập không chính xác
              </span>
            )}
          </form>
        </Form>
        <div className="flex gap-2 mt-4 text-sm italic justify-center">
          <p>Đã có tài khoản?</p>
          <NavLink to={ROUTES.LOGIN}>Đăng nhập</NavLink>
        </div>
      </div>
    </div>
  );
};
