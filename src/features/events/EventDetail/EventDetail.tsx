import { NavLink } from "react-router";
import ScaleBadge from "@/components/ui/Badge/ScaleBadge/ScaleBadge";
import useEventDetail from "./hooks/useEventDetail";
import { useNavigate } from "react-router";
import RouteDetail from "@/features/routes/RouteDetail/RouteDetail";
import Spinner from "@/components/ui/Spinner/Spinner";
import { useTranslation } from "react-i18next";

type EventDetailProps = {
  eid: string
}

const EventDetail = ({ eid }: EventDetailProps) => {
  const { t } = useTranslation("eventsCreation");
  const navigate = useNavigate();
  const [ event, isLoading ] = useEventDetail(eid);

  return <>
    { isLoading ? <Spinner /> : 
      !event ? <></> :
        <div className="text-left mx-auto">
          <div className="max-w-[90%] lg:max-w-2/3 mx-auto card mt-20 p-15">
            <h1 className="mb-10">{ event.name}</h1>
            <div className="flex">
              <p className="flex-6 pr-5">{ event.description }</p>
            </div>
            <hr />
            <div className="flex">
              <ScaleBadge className="flex-2 sm:flex-8" scale={ event.scale } />
            </div>
          </div>
          { event.rid ? 
            <>
              <h1 className="mt-20 mb-10 max-w-[90%] lg:max-w-2/3 mx-auto">{ t("creation.assigned route") }:</h1>
              <RouteDetail rid={ event.rid } />
            </> : <>
              <h1 className="mt-20 max-w-[90%] lg:max-w-2/3 mx-auto text-center mb-10">{ t("creation.not assigned route") }</h1>
              <NavLink className="text-primary text-center block"
                to="/" onClick={(e) => { e.preventDefault(); navigate(-1)}}>Back</NavLink>
            </>
            }
        </div>
    }
  </>
}

export default EventDetail;