import { useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import Button from "@mui/material/Button";

const Confirmation = () => {
  const history = useHistory();
  const [dateTime, setDateTime] = useState([]);

  const user = useSelector((store) => store.user);
  const selectedService = useSelector((store) => store.selected);

  console.log(selectedService);

  const confirm = async () => {
    const formattedDate = dayjs(dateTime).format();
    const payload = {
      user_id: user.id,
      service_id: selectedService.id,
      status: false,
      date: formattedDate,
    };

    console.log(payload);

    axios
      .post("/api/appointments", payload)
      .then((response) => {
        console.log(response);
        alert("Thank you!");
        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
        alert("You have to be logged in to book an appointment. Please login.");
        history.push("/login");
      });
  };

  return (
    <div className="confirmation">
      <h3>{selectedService.service}</h3>
      <div className="imgDescript">
        <img className="confirmImg" src={selectedService.image} />
        <div className="column">
        <p>{selectedService.description}</p>

        <p>${selectedService.cost}</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              value={dateTime}
              onChange={(newDateTime) => setDateTime(newDateTime)}
              label="Basic date time picker"
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button className="confirmBtn" variant="contained" onClick={() => confirm()}>
          Confirm
        </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
