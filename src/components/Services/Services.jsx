import "./Services.css";
import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

const Services = () => {
  const dispatch = useDispatch();
  const services = useSelector((store) => store.services);
  const [image, setImage] = useState("");
  const [service, setService] = useState("");
  const [total_cost, setTotal_cost] = useState("");
  const [description, setDescription] = useState("");

  const formData = { image, service, total_cost, description };

  const isAdmin = useSelector((store) => store.user.admin);

  // Add service modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImage("");
    setService("");
    setTotal_cost("");
    setDescription("");
  };

  // Edit service modal
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setImage("");
    setService("");
    setTotal_cost("");
    setDescription("");
  };

  const handleOpenEdit = (service) => {
    setImage(service.image);
    setService(service.service);
    setTotal_cost(service.total_cost);
    setDescription(service.description);
    setOpenEdit(true);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_SERVICES" });
  }, []);

  const onClick = (service) => {
    console.log(service);
    dispatch({ type: "SELECTED_SERVICE", payload: service });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // dispatch({ type: "POST_SERVICE", payload: formData });
    console.log(service);
    axios
      .post("/api/kalea", formData)
      .then((response) => {
        console.log(response);
        setImage("");
        setService("");
        setTotal_cost("");
        setDescription("");
        setOpen(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/kalea/${id}`)
      .then((response) => {
        console.log("good service delete", response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ! MAKE EDIT FEATURE
  const handelEdit = () => {

    axios
      .put("/api/kalea/${id}", formData)
      .then((response) => {
        console.log(response);
        setImage("");
        setService("");
        setTotal_cost("");
        setDescription("");
        setOpenEdit(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <h3>Services</h3>
            {isAdmin === true && (
              <Button onClick={handleOpen}>Add Service</Button>
            )}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <form onSubmit={handleSubmit}>
                    <input
                      value={image}
                      type="text"
                      id="image"
                      placeholder="Image"
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <input
                      value={service}
                      type="text"
                      id="service"
                      placeholder="Service Name"
                      onChange={(e) => setService(e.target.value)}
                    />
                    <input
                      value={description}
                      type="text"
                      id="description"
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                      value={total_cost}
                      type="text"
                      id="price"
                      placeholder="Price"
                      onChange={(e) => setTotal_cost(e.target.value)}
                    />
                    <button type="submit">Add</button>
                  </form>
                </Typography>
              </Box>
            </Modal>
            <Modal
              open={openEdit}
              onClose={handleCloseEdit}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <form onSubmit={handleSubmit}>
                    <input
                      value={image}
                      type="text"
                      id="image"
                      placeholder="Image"
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <input
                      value={service}
                      type="text"
                      id="service"
                      placeholder="Service Name"
                      onChange={(e) => setService(e.target.value)}
                    />
                    <input
                      value={description}
                      type="text"
                      id="description"
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                      value={total_cost}
                      type="text"
                      id="price"
                      placeholder="Price"
                      onChange={(e) => setTotal_cost(e.target.value)}
                    />
                    <button type="submit" onClick={() => handelEdit(service.id)}>Save</button>
                  </form>
                </Typography>
              </Box>
            </Modal>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow
                key={service.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{service.service}</TableCell>
                <TableCell align="center">
                  <img src={service.image} />
                </TableCell>
                <TableCell align="left">{service.description}</TableCell>
                <TableCell align="left">${service.total_cost}</TableCell>
                <TableCell>
                  <Link to="/Confirmation/">
                    <Button onClick={() => onClick(service)}>Book me</Button>
                  </Link>
                </TableCell>
                <TableCell>
                  {isAdmin === true && (
                    <Button onClick={() => handleOpenEdit(service)}>
                      Edit
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  {isAdmin === true && (
                    <Button onClick={() => handleDelete(service.id)}>
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Services;
