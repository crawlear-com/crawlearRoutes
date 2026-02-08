import RegisterForm from "@/application/features/users/ResgisterForm/RegisterForm";
import useSession from "@/application/hooks/useSession";
import MainLayout from "@/application/pages/layouts/MainLayout";

const Register = () => {
  useSession("/myroutes");

  return (<MainLayout contentClassName="flex flex-col w-full min-h-[80vh]">
      <RegisterForm />
  </MainLayout>);
}

export default Register;