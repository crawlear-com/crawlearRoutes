import * as React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import Spinner from "@/components/ui/Spinner/Spinner";
import RouteEventsDataForm from "@/features/events/RouteEventsDataForm/RouteEventsDataForm";
import type { RouteEvent } from "@/domain/RouteEvent.types";
import { selectUserUUID } from "@/features/users/store/selectors/userSelectors";
import { useSelector } from "react-redux";
import useGetRouteEventByIdAndOwner from "@/pages/RouteEventCreation/hooks/useGetRouteEventByIdAndOwner";
import MainLayout from "@/pages/layouts/MainLayout";
import PageTitle from "@/components/ui/PageTitle/PageTitle";

import "./styles/eventCreation.css";

const RouteEventCreation = () => {
  const { t } = useTranslation(["eventsCreation"]);
  const eid = useParams().id;
  const date = useParams().date;
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ routeEvent, setRouteEvent ] = React.useState<RouteEvent | undefined>(undefined);
  const eventDate = date ? new Date(Number(date)).toISOString() : "";
  const uid = useSelector(selectUserUUID);

  useGetRouteEventByIdAndOwner(setIsLoading, setRouteEvent, uid, eid);

  return (
    <MainLayout contentClassName="min-h-[80vh]"><>
      <PageTitle background="eventCreation--backgroud p-5">
        <h1 className="lg:flex-5/6 sm:flex-4/6 text-right text-white mr-5">{ eid ? t("creation.event update") : t("creation.event creation") }</h1>
      </PageTitle>
      { isLoading ? <Spinner /> : 
        routeEvent ? <RouteEventsDataForm date={ eventDate } routeEvent={ routeEvent } /> :
          <RouteEventsDataForm date={ eventDate } /> }</>
    </MainLayout>);
}

export default RouteEventCreation;