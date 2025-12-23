import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import LoginForm from "../../features/users/LoginForm/LoginForm";
import useSession from "../../hooks/useSession";

const Login = () => {
  useSession("/myroutes");
  
  return (<>
    <Header />
    <main className="flex flex-col w-full min-h-[80vh]">
      <LoginForm />
    </main>
    <Footer />
  </>);
}

export default Login;