import { isOffline } from "@/components/Offline/helpers/offline";
import { useTranslation } from "react-i18next";

const Offline = () => {
  const { t } = useTranslation(["landing"])

  if (isOffline()) {
    return <div className="flex items-center w-full bg-primary text-white text-xl h-25 justify-center">
      ⚠️ { t("main.offline") } ⚠️
    </div>
  } else {
    return <></>
  }
}

export default Offline;