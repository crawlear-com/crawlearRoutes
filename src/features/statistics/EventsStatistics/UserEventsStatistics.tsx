import { Chart } from "react-google-charts";
import { getScaleValue } from "@/helpers/utils";
import { useTranslation } from "react-i18next";

import Spinner from "@/components/ui/Spinner/Spinner";

import useUserEventsStatistics from "./hooks/useUserEventsStatistics";

const UserEventsStatistics = () => {
  const { t } = useTranslation(["myEvents"]);
  const [ data, isLoading ] = useUserEventsStatistics();

  return <div>
    <div className="card pb-0 mb-15 mx-5 sm:mx-auto p-10">
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

      <div className="flex flex-col lg:flex-row justify-center mt-5 lg:w-4/6 m-auto">
        { isLoading ? <Spinner /> : <Chart chartType="PieChart" 
            data = {[["Scale", "Routes per scale"],
              [getScaleValue(1), data.by_scale[1] || 0],
              [getScaleValue(2), data.by_scale[2] || 0],
              [getScaleValue(3), data.by_scale[3] || 0],
              [getScaleValue(4), data.by_scale[4] || 0]]}
            options={{ 
              title: t("statistics.by scale"),
              pieHole: 0.3,
              is3D: false,
            }}/> }
      </div>
    </div>
  </div>;
}

export default UserEventsStatistics;