import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Chart = ({ num }) => {
  const [poke, setPoke] = useState();
  const getPokedata = () => {
    axios
      .get("/api/encyclopedia/", {
        params: {
          type: "detail",
          id: num,
        },
      })
      .then(res => {
        setPoke(res.data);
      });
  };
  useEffect(() => {
    getPokedata();
  }, [num]);

  if (poke !== null && poke !== undefined) {
    const parseData = JSON.parse(poke.stats);

    const data = {
      labels: Object.keys(parseData),
      datasets: [
        {
          label: "능력치",
          data: Object.values(parseData),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };

    return (
      <div>
        <Radar
          data={data}
          options={{
            scale: {
              min: 0,
              max: 160,
              ticks: {
                fontColor: 'red',
                beginAtZero: true,
                stepSize: 40,
                z: 1,
              },
            },
          }}
        />
      </div>
    );
  }
};
export default Chart;
