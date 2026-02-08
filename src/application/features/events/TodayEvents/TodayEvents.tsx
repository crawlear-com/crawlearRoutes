import { useTranslation } from "react-i18next";
import RouteEventCard from "@/application/features/events/RouteEventCard/RouteEventCard";
import useTodayEvents from "./hooks/useTodayEvents";

const TodayEvents = () => {
  const { t } = useTranslation(["eventsCreation"]);
  const [ todayEvents, onEditRouteClick ] = useTodayEvents();
  let extras = <></>;

  return <div className="self-start text-right p-10">
    <h1 className="mb-4">{ t("main.today events") }</h1>
    {
      todayEvents.length === 0 ? <div className="my-5">{ t("creation.no events for today") }</div> :
      todayEvents.map((event) => {
        if (!event.rid && !event.routeName) {
          extras = <span data-eid={ event.id } onClick={ onEditRouteClick } className="font-bold absolute top-3 right-3"> { t("creation.create route for event") } </span>;
        } else {
          extras = <></>;
        }
        return <RouteEventCard key={ event.id } routeEvent={ event } extras={ extras } />;
      })
  }</div>;
}

export default TodayEvents;