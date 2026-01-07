import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import GpxRecord from "../../features/routeCreation/mapCreation/GpxRecord/GpxRecord";

const RecordRoute = () => {

  return (<>
    <Header />
    <main className="flex flex-col w-full min-h-[80vh]">
      <GpxRecord />
    </main>
    <Footer />
  </>);
}

export default RecordRoute;