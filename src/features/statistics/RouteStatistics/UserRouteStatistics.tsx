import { Chart } from "react-google-charts";
import { getScaleValue, toHours, toKm } from "@/helpers/utils";
import { useTranslation } from "react-i18next";
import useUserRouteStatistics from "./hooks/useUserRouteStatistics";
import Spinner from "@/components/ui/Spinner/Spinner";

import "./styles/charts.css";

const UserRouteStatistics = () => {
  const { t } = useTranslation(["myRoutes"]);
  const [ data, easy, medium, difficult, isLoading ] = useUserRouteStatistics();

  return <div className="flex-1 z-10">
    <div className="card p-10 pb-0 mb-15 sm:mx-auto">
      <h1 className="text-right mb-5">{ t("statistics.statistics") }</h1>
      <div className="justify-self-start">
        <b>{ t("statistics.total routes") }:</b> { data.total_routes }
      </div>
      <div className="justify-self-start">
        <b>{ t("statistics.total distance") }:</b> { toKm(data.total_distance) } km
      </div>
      <div className="justify-self-start">
        <b>{ t("statistics.total time") }:</b> { toHours(data.total_duration_time) } { t("statistics.hours") } 
      </div>

      <div className="flex flex-col justify-center mt-5 lg:w-4/6 m-auto">
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
        { isLoading ? <Spinner /> : <Chart chartType="PieChart"
            data = {[["Difficulty", "Routes per difficulty"],
              [easy, data.by_difficulty[1] || 0],
              [medium, data.by_difficulty[2] || 0],
              [difficult, data.by_difficulty[3] || 0]]}
          options={{ 
              title: t("statistics.by difficult"),
              pieHole: 0.3,
              is3D: false
          }}/> }
      </div>
    </div>
  </div>;
}

export default UserRouteStatistics;