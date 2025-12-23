import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RegisterForm from "../../features/users/ResgisterForm/RegisterForm";
import useSession from "../../hooks/useSession";

const Register = () => {
  useSession("/myroutes");

  return (<>
    <Header />
    <main className="flex flex-col w-full min-h-[80vh]">
      <RegisterForm />
    </main>
    <Footer />
  </>);
}

export default Register;