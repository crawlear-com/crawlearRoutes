import { useParams } from "react-router";
import Footer from "../../components/ui/Footer/Footer";
import Header from "../../components/ui/Header/Header";
import EventDetail from "../../features/events/EventDetail/EventDetail";
import { useTranslation } from "react-i18next";

const Event = () => {
  const eid = useParams().id;
  const { t } = useTranslation(["eventsCreation"]);

  return (<>
    <Header />
    <main>
      { eid ? <EventDetail eid={ eid } /> : <>{ t("main.no event specified") }</> }
    </main>
    <Footer />
  </>);

}

export default Event;