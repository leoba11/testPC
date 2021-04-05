import React, {useState} from "react";
import {Button} from "@material-ui/core";
import axios from "axios";
import {useHistory} from "react-router-dom";


const EditReport = ({ location }: any) => {

    const history = useHistory();

    const [username, setUsername] = useState(location.state.username);
    const [promotion, setPromotion] = useState(location.state.promotionType);
    const [phone, setPhone] = useState(location.state.phoneNumber);
    const [date, setDate] = useState(location.state.date);
    const [hour, setHour] = useState(location.state.hour);


    const handleChange = (e: any) => {
        setUsername(e.target.value);
    }

    const handleChangeP = (e: any) => {
        setPromotion(e.target.value);
    }

    const handleChangePh = (e: any) => {
        setPhone(e.target.value);
    }

    const handleChangeD = (e: any) => {
        setDate(e.target.value);
    }

    const handleChangeH = (e: any) => {
        setHour(e.target.value);
    }

    const updateReport = async () => {
        await axios.put(`http://localhost:8080/api/reportUsers/${location.state._id}`, { username: username, promotionType: promotion, phoneNumber: phone, date: date, hour: hour });
        history.push("/");
    }

    return(
        <div>
            <input type='text' defaultValue={username} onChange={handleChange}/>
            <br/>
            <input type='text' defaultValue={promotion} onChange={handleChangeP}/>
            <br/>
            <input type='text' defaultValue={phone} onChange={handleChangePh}/>
            <br/>
            <input type='text' defaultValue={date} onChange={handleChangeD}/>
            <br/>
            <input type='text' defaultValue={hour} onChange={handleChangeH}/>
            <br/>
            <Button variant="contained" color="primary" onClick={() => {updateReport()}}> Modificar </Button>
        </div>
    )
}

export default EditReport;
