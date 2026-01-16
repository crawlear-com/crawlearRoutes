import toast from "react-hot-toast";
import { deleteLike, likeRoute } from "../../../../database/routeRpc";

const useLikeRoute = (): [ 
  (uid: string, rid: string, liked: boolean) => React.JSX.Element ] => {
    const onLikeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;
    const isLiked = element.dataset.isliked === "true";
    const uid = element.dataset.uid;
    const rid = element.dataset.rid;

    event.stopPropagation();

    if (uid && rid) {
      if (isLiked) {
        deleteLike(uid, rid).then(()=> {
          element.innerText = "♡";
          element.dataset.isliked = "false";
          toast.success("Like removed");
        }).catch((e: unknown) => {
        toast.error((e as Error).message);
      });
      } else {
        likeRoute(uid, rid).then(() => {
          element.innerText = "♥️";
          element.dataset.isliked = "true";
          toast.success("Like created");
        }).catch((e: unknown) => {
        toast.error((e as Error).message);
      });
      }
    }
  }

  const likeExtras = (uid: string, rid: string, liked: boolean) => <div data-uid={ uid } data-rid={ rid } data-isliked = { liked }
    className="absolute top-3 right-3" onClick={ onLikeClick }>{ liked ? "♥️" : "♡" }</div>

  return [ likeExtras ]
}

export default useLikeRoute;