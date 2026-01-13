import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RouteDetail from "../../features/routes/RouteDetail/RouteDetail";
import useSession from "../../hooks/useSession";

const Route = () => {
  useSession();

  return (<>
    <Header />
    <main>
      <RouteDetail />
    </main>
    <Footer />
  </>);
}

export default Route;