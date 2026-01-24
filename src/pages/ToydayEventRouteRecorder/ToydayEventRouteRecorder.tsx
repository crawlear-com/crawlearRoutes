import { useParams } from "react-router";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import EventRouteRecorder from "../../features/events/EventRouteRecorder/EventRouteRecorder";
import { getRouteEventByIdAndOwner } from "../../database/eventsRpc";
import toast from "react-hot-toast";
import * as React from "react";
import type { RouteEvent } from "../../types/RouteEvent.types";
import { useSelector } from "react-redux";
import { selectUserUUID } from "../../features/users/store/selectors/userSelectors";
import Spinner from "../../components/Spinner/Spinner";

const ToydayEventRouteRecorder = () => {
  const eid = useParams().id;
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ routeEvent, setRouteEvent ] = React.useState<RouteEvent>();
  const userId = useSelector(selectUserUUID);

  React.useEffect(() => {
    if (eid && userId) {
      setIsLoading(true);
      getRouteEventByIdAndOwner(userId, eid).then((event) => {
        setIsLoading(false);
        setRouteEvent(event);
      }).catch((e: unknown) => {
          toast.error((e as Error).message);
        });
    } else {
      setIsLoading(false);
    }
  }, [eid, userId]);


  return (<>
    <Header />
    <main>
      { isLoading ? <Spinner /> : 
        routeEvent ? <EventRouteRecorder routeEvent={ routeEvent } />: <></> }
    </main>
    <Footer />
  </>);
}

export default ToydayEventRouteRecorder;