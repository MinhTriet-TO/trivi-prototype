import React, { useState } from "react";
import {columnChart} from "./ColumnChartByCategory";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import onClickOutside from 'react-onclickoutside';
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data.js")(Highcharts);


function SelectControlled({categories, topProducts}){
    const [open, setOpen] = useState(true);
    const [a_chart, setChart] = useState();
    const [ok,setOk] = useState(false);
    const [selectedOption, setSelectedOption] = useState();
    SelectControlled.handleClickOutside = () => setOpen(false);
    function handleChange(event){
        var category = event.target.value;
        setSelectedOption(category);
        setOk(true);
        setOpen(true);
        console.log(open);
        let x_value = topProducts[category].map(props=>props.product_name + ' ' + props.product_id.toString());
        let y_value = topProducts[category].map(props=>props.revenue)
        setChart(columnChart('Top 10 product in category ' + category,x_value,y_value));
    }
    return (
        <div>

        <select value={selectedOption} onChange={event => handleChange(event)}>
        <option hidden default value> Choose a category</option>
        {categories.map(category => (
            <option key ={category.id}>{category.value}</option>
        ))}
        </select>
        {open && ok && <div> <HighchartsReact highcharts={Highcharts} options={a_chart} /> </div>}
        </div>
    );
};


const clickOutsideConfig = {
    handleClickOutside: () => SelectControlled.handleClickOutside,
  };
  
export default onClickOutside(SelectControlled, clickOutsideConfig);
// export default SelectControlled;