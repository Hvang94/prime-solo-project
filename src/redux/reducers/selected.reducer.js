const selectedService = (state = [], action) => {
    if (action.type === "SELECTED_SERVICE") {
      return action.payload;
    }
    return state;
  }

  export default selectedService;