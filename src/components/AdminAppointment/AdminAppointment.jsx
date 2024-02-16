import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AdminAppointment = () => {
  const [confirmedServices, setConfirmedServices] = useState([]);
  const [newDate, setNewDate] = useState([]);
  const [editedService, setEditedService] = useState({});

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setNewDate([]);
    setEditedService({});
    setOpen(false);
  };

  const handleOpen = (service) => {
    setEditedService(service);
    setOpen(true);
  };

  useEffect(() => {
    renderAppointments();
  }, []);

  const renderAppointments = () => {
    axios
      .get("/api/appointments")
      .then((response) => {
        setConfirmedServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const confirm = (id, status) => {
    axios
      .put(`/api/appointments/${id}`, { status: true })
      .then((response) => {
        console.log(response);
        renderAppointments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reschedule = (id, newDate) => {
    const date = newDate.$d;

    axios
      .patch(`/api/appointments/${id}`, { date })
      .then((response) => {
        console.log(response);
        renderAppointments();
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancel = (id) => {
    axios
      .delete(`/api/appointments/${id}`)
      .then((response) => {
        console.log("DELETE good");
        renderAppointments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h4 className="adminPending">Pending</h4>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell>Service</TableCell>
              <TableCell align="left">Date & Time</TableCell>
              <TableCell align="left">Cost</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {confirmedServices.map((service) => (
              <TableRow
                key={service.appointment_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{service.username}</TableCell>
                <TableCell align="left">{service.service}</TableCell>
                <TableCell align="left">
                  {format(new Date(service.date), "MMM d, yyyy, h:mm a")}
                </TableCell>
                <TableCell align="left">${service.cost}</TableCell>
                {service.status === false ? (
                  <TableCell align="left">Pending</TableCell>
                ) : (
                  <TableCell align="left">Confirmed</TableCell>
                )}
                <TableCell align="left">
                  <Button
                    variant="contained"
                    className="adminButton"
                    onClick={() =>
                      confirm(service.appointment_id, service.status)
                    }
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="contained"
                    className="adminButton"
                    onClick={() => handleOpen(service)}
                  >
                    Reschedule
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DateTimePicker"]}>
                            <DateTimePicker
                              value={newDate}
                              onChange={(newDateTime) =>
                                setNewDate(newDateTime)
                              }
                              label="Basic date time picker"
                            />
                            <Button
                              variant="contained"
                              onClick={() =>
                                reschedule(
                                  editedService.appointment_id,
                                  newDate
                                )
                              }
                            >
                              Reschedule Confirm
                            </Button>
                          </DemoContainer>
                        </LocalizationProvider>
                      </Typography>
                    </Box>
                  </Modal>
                  <Button
                    variant="contained"
                    className="adminButton"
                    onClick={() => cancel(service.appointment_id)}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminAppointment;
