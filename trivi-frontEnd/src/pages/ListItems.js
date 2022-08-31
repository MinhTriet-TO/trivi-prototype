import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Table from 'react-bootstrap/Table';
import{FixedSizeList as List} from "react-window";
import {
  Col,
  Row,
  Container,
  Button,
  Form,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { CSVLink } from "react-csv";
import ProcessTables from "./tables/ProcessTables";
import { TabTitle, capitalize } from "../constants/generalFunctions";
import { AppContext } from "./AppContext";
import { itemTypeFrench } from "../constants/utils";

export default () => {
  const {fetchRequest} = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const itemType = location.pathname.split("/").slice(-1)[0];
  const [isViewDetail, setIsViewDetail] = useState(false);
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [columns, setColumn] = useState([]);
  const headerKeys = searchItems.length
    ? Object.keys(searchItems[0]).map((key) => {
        return { label: key, key: key };
      })
    : [];

  TabTitle([itemType]+' List');
  useEffect(() => {
    fetchRequest(`trividb/${itemType}/`, 'GET')
    .then((data) => {
      if (data != undefined){
        setItems(items => {
          return data
        });
      }
    });
  },[]);
  console.log('local', items);
  var attribute = []
  for (var prop in items[0]) {
    if (Object.prototype.hasOwnProperty.call(items[0], prop)) {
      attribute.push(prop);
    }
  } 
  console.log('attribute?', attribute);

  const tableRows=items.map(
    (element)=>{
        return( 
          <tr>
              {
                Object.entries(element).map((attribute)=>{
                   return <td>{attribute[1]}</td>
                })
              }
          </tr>    
        )
    }
  )

  return (
    <article>
    <Container>

        <h1>List of {itemType}</h1>

          <Table hover>
              <thead>
                <tr>    
                  {attribute.map(a=>{
                    return <th>{a}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {tableRows}


              </tbody>
            </Table>      
    </Container>
    </article>
    
  );
};

