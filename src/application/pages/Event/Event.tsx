import { NavLink, useParams } from "react-router";
import EventDetail from "@/application/features/events/EventDetail/EventDetail";
import { useTranslation } from "react-i18next";
import MainLayout from "@/application/pages/layouts/MainLayout";
import { useSelector } from "react-redux";
import { selectUserUUID } from "@/application/features/users/store/selectors/userSelectors";

const Event = () => {
  const eid = useParams().id;
  const { t } = useTranslation(["myEvents", "landing"]);
  const uid = useSelector(selectUserUUID);

  return (
    <MainLayout><>
      { uid ? (eid ? <EventDetail eid={ eid } /> : <>{ t("main.no event specified") }</>) : <></> }
      { !uid ? <>
        <p>{ t("main.need register") }</p>
        <NavLink className="link" to="/register">{ t("main.register") }</NavLink> o <NavLink className="link" to="/login">{ t("main.login") }</NavLink>
      </> : <></>}
    </></MainLayout>);
}

export default Event;