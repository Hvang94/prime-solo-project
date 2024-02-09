import "./Services.css";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Services = () => {
  const dispatch = useDispatch();
  const services = useSelector((store) => store.services);

  useEffect(() => {
    dispatch({ type: 'FETCH_SERVICES' });
  }, [dispatch]);

  const onClick = (service) => {
    console.log(service);
    dispatch({ type: 'SELECTED_SERVICE', payload: service });
  };

  return (
    <>
      <h1>Services</h1>
      {services.map((service) => {
        return (
          <div key={service.id}>
            <h4>{service.service}</h4>
            <img src={service.image} />
            <p>{service.description}</p>
            <p>${service.total_cost}</p>
            <Link to="/Confirmation/">
            <button onClick={() => onClick(service)}>Book me</button>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default Services;
