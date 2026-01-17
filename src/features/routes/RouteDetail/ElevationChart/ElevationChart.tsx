import type { ElevationChartProps } from "./ElevationChart.types"
import Chart from 'react-google-charts';

const ElevationChart = ({ data, className }: ElevationChartProps) => {
    return <Chart className={ className ? className : "" } chartType="LineChart"
              data = { [["point", "elevation"], ...data ] }
            options={{ 
                title: "Elevation map",
                pieHole: 0.3,
                is3D: false
            }}/>
}

export default ElevationChart;