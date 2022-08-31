import React, { useEffect, useState, useContext } from "react"
import { Col, Row, Card } from "@themesberg/react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { TabTitle } from "../constants/generalFunctions";
import { AppContext } from "./AppContext";
import {pieChart} from "../components/PieChartOverall";
import SignOut from "../components/SignOut";
import SelectControlled from "../components/Dropdown";

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data.js")(Highcharts);

export default () => {
  TabTitle("Dashboard");
  var product;
  const {fetchRequest} = useContext(AppContext);
  const [charts, setCharts] = useState([]);
  const[categories, setCategories] = useState([]);
  const[topProducts,setTopProducts] = useState([]);

  useEffect(() => {
    fetchRequest("trividb/get-data/", 'GET')
    .then((data) => {
      if (data != undefined) {
        var listCharts = data.reports.map((chart) => {
          var newChart = pieChart(chart.title, chart.portion, chart.type);
          return newChart;
        });
        setCharts(listCharts);
        var items_array = data.reports.map((chart) =>{
          var cate = chart.categories;
          return cate;
        });
        setCategories(JSON.parse(items_array));

        
      }
    }).catch((err) => alert(err));
  }, []);

  useEffect(()=>{
    fetchRequest("trividb/most-popular-product/", 'GET')
    .then((data) => {
      if(data != undefined){
      setTopProducts(data.Result);
      }
    }).catch((err) => alert(err));
  }, []);

  return (
    <>
      <Row className="mt-3 justify-content-md-center">
        
        {charts.map((chart, index) => (
          <Col xs={18} xl={6} sm={6} className="mb-4" key={index}>
            <Card
              border="light"
              className="shadow-sm"
              style={{ overflow: "hidden" }}
            >
              <HighchartsReact highcharts={Highcharts} options={chart} />
              <p></p>
              <SelectControlled categories={categories} topProducts= {topProducts} />
              {/* <Dropdown title="Select Category" items={categories}/> */}
              {/* <HighchartsReact highcharts={Highcharts} options={a_chart} /> */}
              <p></p>
              <SignOut></SignOut>
            </Card>
          </Col>
        ))}

      </Row>
    </>
  );

};
