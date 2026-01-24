import { useParams } from "react-router";
import EventDetail from "@/features/events/EventDetail/EventDetail";
import { useTranslation } from "react-i18next";
import MainLayout from "@/layouts/MainLayout";

const Event = () => {
  const eid = useParams().id;
  const { t } = useTranslation(["eventsCreation"]);

  return (
    <MainLayout>
      { eid ? <EventDetail eid={ eid } /> : <>{ t("main.no event specified") }</> }
    </MainLayout>);
}

export default Event;