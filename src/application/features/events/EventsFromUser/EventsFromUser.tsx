import { useTranslation } from "react-i18next";
import useEventsFromUser from "./hooks/useEventsFromUser";
import ItemsList from "@/application/components/ItemsList/ItemsList";
import type { RouteEvent } from "@/domain/RouteEvent.types";
import ItemListContainer from "@/application/components/ItemsList/ItemListContainer";
import ItemListRouteEventsReduxRespository from "@/infrastructure/Repository/ItemListRouteEventsReduxRespository/ItemListRouteEventsReduxRespository";

const EventsFromUser = () => {
  const { t } = useTranslation(['eventsCreation']);
  const [ myEventsCard ] = useEventsFromUser();

  return <div className="self-start text-right z-10">
    <ItemListContainer<RouteEvent> repository={ ItemListRouteEventsReduxRespository }>
      <ItemsList<RouteEvent> card={ myEventsCard }>
        <h1 className="mr-3 inline-block mb-4">{ t("main.my events") }</h1>
      </ItemsList>
    </ItemListContainer>
  </div>
}

export default EventsFromUser;