import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useTranslation } from "react-i18next";
import StepRouteCreation from "../../features/routeCreation/StepRouteCreation/StepRouteCreation";

const RecordRoute = () => {
  const { t } = useTranslation(["routeCreation"])

  return (<>
    <Header />
    <main className="flex flex-col w-full min-h-[80vh]">
      <h1>{ t("main.live route creation") }</h1>
      <StepRouteCreation />      
    </main>
    <Footer />
  </>);
}

export default RecordRoute;