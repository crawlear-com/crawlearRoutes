import LoginForm from "@/features/users/LoginForm/LoginForm";
import useSession from "@/hooks/useSession";
import MainLayout from "@/pages/layouts/MainLayout";

const Login = () => {
  useSession("/myroutes");
  
  return (
    <MainLayout contentClassName="flex flex-col w-full min-h-[80vh]">
      <LoginForm />
    </MainLayout>);
}

export default Login;