import { Chart } from "react-google-charts";
import { getScaleValue } from "../../../helpers/utils";
import { useTranslation } from "react-i18next";
import useUserStatistics from "./hooks/useUserStatistics";
import Spinner from "../../../components/Spinner/Spinner";

import "./styles/charts.css";

const UserStatistics = () => {
  const { t } = useTranslation(["myRoutes"]);
  const [ data, easy, medium, difficult, isLoading ] = useUserStatistics();

  return <div className="border border-primary rounded-2xl p-5 pb-0 mb-15 mx-5 sm:w-[80%] sm:mx-auto">
    <div className="justify-self-start">
      <b>{ t("statistics.total routes") }:</b> { data.total_routes }
    </div>
    <div className="justify-self-start">
      <b>{ t("statistics.total distance") }:</b> { (data.total_distance / 1000).toFixed(2) } km
    </div>
    <div className="justify-self-start">
      <b>{ t("statistics.total time") }:</b> { (data.total_duration_time / 3600 / 1000).toFixed(2) } { t("statistics.hours") } 
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
  </div>;
}

export default UserStatistics;