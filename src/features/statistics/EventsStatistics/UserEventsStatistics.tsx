import { Chart } from "react-google-charts";
import { getScaleValue } from "@/helpers/utils";
import { useTranslation } from "react-i18next";

import Spinner from "@/components/ui/Spinner/Spinner";

import useUserEventsStatistics from "./hooks/useUserEventsStatistics";

const UserEventsStatistics = () => {
  const { t } = useTranslation(["myEvents"]);
  const [ data, isLoading ] = useUserEventsStatistics();

  return <div className="container self-start card pb-0 sm:mx-auto p-10 z-10">
    <h1 className="text-right mb-5">{ t("statistics.statistics") }</h1>
    <div className="justify-self-start">
      <b>{ t("statistics.total events") }:</b> { data.total_events }
    </div>
    <div className="justify-self-start">
      <b>{ t("statistics.future events") }:</b> { data.future_events }
    </div>
    <div className="justify-self-start">
      <b>{ t("statistics.past events") }:</b> { data.past_events } 
    </div>

      { isLoading ? <Spinner /> : <Chart chartType="PieChart" 
        data = {[["Scale", "Routes per scale"],
          [getScaleValue(1), data.by_scale[1] || 0],
          [getScaleValue(2), data.by_scale[2] || 0],
          [getScaleValue(3), data.by_scale[3] || 0],
          [getScaleValue(4), data.by_scale[4] || 0]]}
        options={{ 
          title: t("statistics.by scale"),
          pieHole: 0.3,
          is3D: true,
          chartArea: {
            width: "100%",
            heigth: "100%"
          }
        }}/>
      }
  </div>;
}

export default UserEventsStatistics;