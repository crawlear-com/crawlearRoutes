import Footer from "../../components/ui/Footer/Footer";
import Header from "../../components/ui/Header/Header";
import SearchRouteMap from "../../features/maps/SearchRouteMap/SearchRouteMap";

const SearchRoute = () => {
  return (<>
    <Header />
    <main className="sm:w-[90%] m-auto min-h-[80vh]">
      <SearchRouteMap />
    </main>
    <Footer />
  </>);
}

export default SearchRoute;