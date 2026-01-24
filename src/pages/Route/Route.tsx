import Footer from "../../components/ui/Footer/Footer";
import Header from "../../components/ui/Header/Header";
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