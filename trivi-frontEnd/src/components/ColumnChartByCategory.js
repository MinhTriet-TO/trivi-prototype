import React, { useEffect, useState, useContext } from "react"
import Highcharts from "highcharts";
import { AppContext } from "../pages/AppContext";
import {pieChart} from "../components/PieChartOverall";

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data.js")(Highcharts);


export const columnChart = (title,product_name,revenue) => {
    return{
      title: {
        text: title,
    },
      xAxis: {
        categories: product_name,
        title: {
          text: "Product name (ID)"
        }
    },
      yAxis: {
        min: 0,
        title: {
            text: "Total Revenue (USD)"
        }
    },

    plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 1
      }
    },

      chart: {
        type: 'column'  
      },

      series: [
        {
          showInLegend: false,
          data: revenue,
        },
      ]
    }; 
};


