import * as React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import Spinner from "@/components/ui/Spinner/Spinner";
import RouteEventsDataForm from "@/features/events/RouteEventsDataForm/RouteEventsDataForm";
import type { RouteEvent } from "@/types/RouteEvent.types";
import { selectUserUUID } from "@/features/users/store/selectors/userSelectors";
import { useSelector } from "react-redux";
import useGetRouteEventByIdAndOwner from "@/hooks/useGetRouteEventByIdAndOwner";
import MainLayout from "@/layouts/MainLayout";

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
    <MainLayout contentClassName="w-[90%] m-auto min-h-[80vh] mt-10"><>
      <h1>{ eid ? t("creation.event update") : t("creation.event creation") }</h1>
      { isLoading ? <Spinner /> : 
        routeEvent ? <RouteEventsDataForm date={ eventDate } routeEvent={ routeEvent } /> :
          <RouteEventsDataForm date={ eventDate } /> }</>
    </MainLayout>);
}

export default RouteEventCreation;