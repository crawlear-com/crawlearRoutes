import LoginForm from "@/application/features/users/LoginForm/LoginForm";
import useSession from "@/application/hooks/useSession";
import MainLayout from "@/application/pages/layouts/MainLayout";

const Login = () => {
  useSession("/myroutes");
  
  return (
    <MainLayout contentClassName="flex flex-col w-full min-h-[80vh]">
      <LoginForm />
    </MainLayout>);
}

export default Login;