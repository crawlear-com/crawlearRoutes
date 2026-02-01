import { useTranslation } from "react-i18next";
import StepRouteCreation from "@/features/routeCreation/StepRouteCreation/StepRouteCreation";
import Spinner from "@/components/ui/Spinner/Spinner";
import MainLayout from "@/layouts/MainLayout";
import useRouteCreation from "./hooks/useRouteCreation";
import PageTitle from "@/components/ui/PageTitle/PageTitle";

import "./styles/routeCreation.css";

const RouteCreation = () => {
  const { t } = useTranslation(["routeCreation"]);
  const [ isLoading, rid, eid ] = useRouteCreation();

  return (
    <MainLayout contentClassName="min-h-[80vh]"><>
      <PageTitle background="routeCreation--backgroud p-5">
        <h1 className="lg:flex-5/6 sm:flex-4/6 text-right text-white mr-5">{ rid ? t("main.route update") : eid ? t("main.route creation for event") : t("main.route creation") }</h1>
      </PageTitle>
      { isLoading ? <Spinner /> : <><StepRouteCreation /></> }</>
    </MainLayout>);
}

export default RouteCreation;