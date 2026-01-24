import RegisterForm from "@/features/users/ResgisterForm/RegisterForm";
import useSession from "@/hooks/useSession";
import MainLayout from "@/layouts/MainLayout";

const Register = () => {
  useSession("/myroutes");

  return (<MainLayout contentClassName="flex flex-col w-full min-h-[80vh]">
      <RegisterForm />
  </MainLayout>);
}

export default Register;