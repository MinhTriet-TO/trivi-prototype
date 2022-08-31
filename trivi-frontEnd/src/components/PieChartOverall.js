import Highcharts from "highcharts";

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data.js")(Highcharts);

export const pieChart = (title,chartData,chartType) => {
    return{
      title: {
        text: title ? title : "",
        margin: 20,
        style: {
          fontSize: "1.25rem",
          color: "#262B40",
        },
      },
      chart: {
        type: chartType ? chartType : "line",
        style: {
          fontFamily: "Nunito Sans",
        },
      },
      series: chartData
      ? [
          {
            name: "Total",
            data: chartData,
            colorByPoint: true,
          },
        ]
      : [],
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
          },
          showInLegend: true,
        },
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      legend: {
        enabled: false,
      },
    };
  };
