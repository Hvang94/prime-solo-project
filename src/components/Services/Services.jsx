import "./Services.css";
import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
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
import { useHistory } from "react-router-dom";


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
  const history = useHistory();
  const dispatch = useDispatch();
  const services = useSelector((store) => store.services);
  const [image, setImage] = useState("");
  const [service, setService] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  const formData = { image, service, cost, description };

  const isAdmin = useSelector((store) => store.user.admin);
  const isAuthenticated = useSelector((store) => store.user.id);
  console.log(isAuthenticated);

  // Add service modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImage("");
    setService("");
    setCost("");
    setDescription("");
  };

  // Edit service modal
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setImage("");
    setService("");
    setCost("");
    setDescription("");
  };

  const handleOpenEdit = (service) => {
    setId(service.id);
    setImage(service.image);
    setService(service.service);
    setCost(parseInt(service.cost));
    setDescription(service.description);
    setOpenEdit(true);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_SERVICES" });
  }, []);

  const onClick = (service) => {
    console.log(service);
    // if (isAuthenticated !== null) {
    dispatch({ type: "SELECTED_SERVICE", payload: service });
    // } else {
    //   history.push("/login");
    // }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // dispatch({ type: "POST_SERVICE", payload: formData });
    console.log(service);
    axios
      .post("/api/services", formData)
      .then((response) => {
        console.log(response);
        setImage("");
        setService("");
        setCost("");
        setDescription("");
        setOpen(false);
        dispatch({ type: "FETCH_SERVICES" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/services/${id}`)
      .then((response) => {
        console.log("good service delete", response);
        dispatch({ type: "FETCH_SERVICES" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (event, id, service, image, description, cost) => {
    event.preventDefault();
    const editFormData = { service, image, description, cost };
    axios
      .put(`/api/services/${id}`, editFormData)
      .then((response) => {
        console.log(response);
        setImage("");
        setService("");
        setCost("");
        setDescription("");
        setOpenEdit(false);
        dispatch({ type: "FETCH_SERVICES" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h3 className="serviceHeader">Services</h3>
      {isAdmin === true && (
        <Button
          variant="contained"
          className="addServiceBtn"
          onClick={handleOpen}
        >
          Add Service
        </Button>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
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
                      value={cost}
                      type="text"
                      id="price"
                      placeholder="Price"
                      onChange={(e) => setCost(e.target.value)}
                    />
                    <Button variant="contained" type="submit">
                      Add
                    </Button>
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
                  <form
                    onSubmit={() =>
                      handleEdit(event, id, service, image, description, cost)
                    }
                  >
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
                      value={cost}
                      type="text"
                      id="price"
                      placeholder="Price"
                      onChange={(e) => setCost(e.target.value)}
                    />
                    <Button variant="contained" type="submit">
                      Save
                    </Button>
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
                <TableCell className="serviceDescriptions" align="center">{service.service}</TableCell>
                <TableCell className="serviceDescriptions" align="center">
                  <img src={service.image} />
                </TableCell>
                <TableCell className="serviceDescriptions" align="left">{service.description}</TableCell>
                <TableCell className="serviceDescriptions" align="left">${service.cost}</TableCell>
                <TableCell>
                  <Link to="/Confirmation/">
                    <Button
                      variant="contained"
                      onClick={() => onClick(service)}
                    >
                      Book me
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  {isAdmin === true && (
                    <Button
                      variant="contained"
                      onClick={() => handleOpenEdit(service)}
                    >
                      Edit
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  {isAdmin === true && (
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(service.id)}
                    >
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
