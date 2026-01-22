import { NavLink } from "react-router";
import ScaleBadge from "../../../components/Badge/ScaleBadge/ScaleBadge";
import useEventDetail from "./hooks/useEventDetail";
import { useNavigate } from "react-router";

const EventDetail = () => {
  const [ event ] = useEventDetail();
  const navigate = useNavigate();

  if (!event) {
    return <></>;
  } else {
    return <div className="text-left mx-auto">
      <div className="max-w-[90%] lg:max-w-2/3 mx-auto">
        <h1>{ event.name}</h1>
        <div className="flex">
          <p className="flex-6 pr-5">{ event.description }</p>
        </div>
        <hr />
        <div className="flex">
          <ScaleBadge className="flex-2 sm:flex-8" scale={ event.scale } />
        </div>
      </div>
      <NavLink className="text-primary text-center block"
        to="/" onClick={(e) => { e.preventDefault(); navigate(-1)}}>Back</NavLink>
    </div>
  }
}

export default EventDetail;