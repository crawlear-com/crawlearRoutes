import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useGuard from "../../hooks/useGuard";

const MyRoutes = () => {
  useGuard();
  
  return (<main>
    <Header />
    <h1>My routes page</h1>
    <Footer />
  </main>);
}

export default MyRoutes;