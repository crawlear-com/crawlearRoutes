import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import SupabaseRouteRepository from "@/infrastructure/Repository/RouteRepository/SupabaseRouteRepository";
import RouteDataProvider from "@/infrastructure/DataProvider/RouteDataProvider/RouteDataProvider";
import * as React from "react";

const useLikeRoute = (): [ 
  (uid: string, rid: string, liked: boolean) => React.JSX.Element ] => {
    const { t } = useTranslation(["myRoutes"]);
    const repository = React.useMemo(() => new SupabaseRouteRepository(), []);
    const provider = React.useMemo(() => new RouteDataProvider(repository), [repository]);
    const onLikeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;
    const isLiked = element.dataset.isliked === "true";
    const uid = element.dataset.uid;
    const rid = element.dataset.rid;

    event.stopPropagation();

    if (uid && rid) {
      if (isLiked) {
        provider.deleteLikeRoute(uid, rid).then(()=> {
          element.innerText = "♡";
          element.dataset.isliked = "false";
          toast.success(t("main.like removed"));
        }).catch(() => {
          toast.error(t("errors.like not removed"));
        });
      } else {
        provider.likeRoute(uid, rid).then(() => {
          element.innerText = "♥️";
          element.dataset.isliked = "true";
          toast.success(t("main.like created"));
        }).catch(() => {
          toast.error(t("errors.like not added"));
        });
      }
    }
  }

  const likeExtras = (uid: string, rid: string, liked: boolean) => <div data-uid={ uid } data-rid={ rid } data-isliked = { liked }
    className="absolute top-3 right-3" onClick={ onLikeClick }>{ liked ? "♥️" : "♡" }</div>

  return [ likeExtras ]
}

export default useLikeRoute;