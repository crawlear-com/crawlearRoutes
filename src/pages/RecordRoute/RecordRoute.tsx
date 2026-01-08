import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import GpxRecord from "../../features/routeCreation/mapCreation/GpxRecord/GpxRecord";
import { useTranslation } from "react-i18next";

const RecordRoute = () => {
  const { t } = useTranslation(["routeCreation"])
  return (<>
    <Header />
    <main className="flex flex-col w-full min-h-[80vh]">
      <h1>{ t("main.live route creation") }</h1>
      <p className="mb-5 w-[90%] sm:w-[80%] m-auto">{ t("main.route creation description") }</p>
      <GpxRecord />
    </main>
    <Footer />
  </>);
}

export default RecordRoute;