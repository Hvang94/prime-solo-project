import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const AdminAppointment = () => {
  const [confirmedServices, setConfirmedServices] = useState([]);

  useEffect(() => {
    axios
      .get("/api/client")
      .then((response) => {
        setConfirmedServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
          <><>
          <h3>Pending Services</h3>
          {confirmedServices.map((services) => {
              return (
                  <>
                      {services.confirmed === false ? (
                          <div key={services.id}>
                              <h4>{services.service}</h4>
                              <p>{services.description}</p>
                              <p>${services.total_cost}</p>
                              <p>{services.date}</p>
                          </div>
                      ) : (
                          ""
                      )}
                  </>
              );
          })}
      </><div>
              <h3>Confirmed Services</h3>
              {confirmedServices.map((services) => {
                  return (
                      <>
                          {services.confirmed === true ? (
                              <div key={services.id}>
                                  <h4>{services.service}</h4>
                                  <p>{services.description}</p>
                                  <p>${services.total_cost}</p>
                                  <p>{services.date}</p>
                              </div>
                          ) : (
                              ""
                          )}
                      </>
                  );
              })}
          </div></>
  );
};

export default AdminAppointment;
