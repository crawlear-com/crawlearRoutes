import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectIsOffline } from "../store/selectors/offlineSelectors";

const OfflineBanner = () => {
  const { t } = useTranslation(["landing"]);
  const isOffline = useSelector(selectIsOffline);

  if (isOffline) {
    return <div className="sticky top-0 flex items-center w-full bg-primary text-white text-xl h-25 justify-center z-1000 p-10">
      ⚠️ { t("main.offline") } ⚠️
    </div>
  } else {
    return <></>
  }
}

export default OfflineBanner;