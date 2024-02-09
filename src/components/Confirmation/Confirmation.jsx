import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const Confirmation = () => {
  const dispatch = useDispatch();
  const { image, service, total_cost, description } = useSelector(
    (store) => store.selected
  );
  const [dateTime, setDateTime] = useState([]);
  const date = dateTime.$d;

  const confirm = async () => {
    await alert("Thank you!");
    // await dispatch({type: "POST_CLIENT", payload: { image, service, total_cost, description }})
    axios
      .post("/api/client", { image, service, total_cost, description, date })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>{service}</h3>
      <img src={image} />
      <p>{description}</p>
      <p>${total_cost}</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DateTimePicker
            value={dateTime}
            onChange={(newDateTime) => setDateTime(newDateTime)}
            label="Basic date time picker"
          />
        </DemoContainer>
      </LocalizationProvider>
      {/* <Link to={"/Home"}> */}
      <button onClick={() => confirm()}>Confirm</button>
      {/* </Link> */}
    </div>
  );
};

export default Confirmation;
