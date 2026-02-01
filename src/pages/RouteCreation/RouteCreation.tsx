import { useTranslation } from "react-i18next";
import StepRouteCreation from "@/features/routeCreation/StepRouteCreation/StepRouteCreation";
import Spinner from "@/components/ui/Spinner/Spinner";
import MainLayout from "@/layouts/MainLayout";
import useRouteCreation from "./hooks/useRouteCreation";

const RouteCreation = () => {
  const { t } = useTranslation(["routeCreation"]);
  const [ isLoading, rid, eid ] = useRouteCreation();

  return (
    <MainLayout contentClassName="w-[90%] m-auto min-h-[80vh] mt-10"><>
      <h1 className="text-right mb-5">{ rid ? t("main.route update") : eid ? t("main.route creation for event") : t("main.route creation") }</h1>
      { isLoading ? <Spinner /> : <><StepRouteCreation /></> }</>
    </MainLayout>);
}

export default RouteCreation;