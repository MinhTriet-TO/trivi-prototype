import React from "react";
import {useHistory } from "react-router-dom";
import {Button} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";



export default()=>{
    const history = useHistory();

    const handleLogout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        history.push("/sign-in");
    };
    return (
    <Button
        variant="secondary"
        onClick={handleLogout}
    >
    <FontAwesomeIcon icon={faSignOutAlt} className="me-1" /> Sign Out

    </Button>
    );
}