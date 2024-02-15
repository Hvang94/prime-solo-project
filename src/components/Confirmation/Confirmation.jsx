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


const Confirmation = () => {

  const history = useHistory();
  const [dateTime, setDateTime] = useState([]);
  // const date = dateTime.$d;

  const user = useSelector((store) => store.user); // Assuming this is where you get the user info
  const selectedService = useSelector((store) => store.selected);

  console.log(selectedService)

  const confirm = async () => {
  

    const formattedDate = dayjs(dateTime).format();
    const payload = {
      user_id: user.id, // Assuming the user's ID is stored in this part of the state
      service_id: selectedService.id, // You need to have the service ID from somewhere
      status: false, // or false, depending on what you need
      date: formattedDate,
    };

    console.log(payload)

    axios
      .post("/api/appointments", payload)
      .then((response) => {
        console.log(response);
        alert("Thank you!");
        history.push('/home');
      })
      .catch((error) => {
        console.log(error);
        alert("You have to be logged in to book an appointment. Please login.")
        history.push('/login');
      });
  };

  return (
    <div>
        <h3>{selectedService.service}</h3>
        <img src={selectedService.image} />
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
      <button onClick={() => confirm()}>Confirm</button>
    </div>
  );
};

export default Confirmation;
