import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SendMessage } from "./SendMessage.js";
import { useParams } from "react-router";

const Inbox = ({isLoggedIn}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn) navigate("/login")
    },[])

    return <h1>Inbox</h1>
}

export default Inbox;