import { useReducer } from "react";

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step }; // Decrement by step
    case "inc":
      return { ...state, count: state.count + state.step }; // Increment by step
    case "setcount":
      return { ...state, count: action.payload }; // Set the count directly
    case "setstep":
      return { ...state, step: action.payload }; // Set the step value
      case "reset":
        return { count : 0 , step : 1} ; 
      default:
      throw new Error("Unknown action");
  }
}

function DateCounter() {
  // useReducer for count and step
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object based on the count
  const date = new Date("June 21 2027");
  date.setDate(date.getDate() + count);

  // Function to decrement count by step
  const dec = function () {
    dispatch({ type: "dec" });
  };

  // Function to increment count by step
  const inc = function () {
    dispatch({ type: "inc" });
  };

  // Set count directly based on input
  const defineCount = function (e) {
    dispatch({ type: "setcount", payload: Number(e.target.value) });
  };

  // Update step value when the range slider changes
  const defineStep = function (e) {
    dispatch({ type: "setstep", payload: Number(e.target.value) });
  };

  // Reset step to 1 (you can add count reset too if needed)
  const reset = function () {
    dispatch({type : "reset"})
    // dispatch({ type: "setstep", payload: 1 });
    // dispatch({ type: "setcount", payload: 0 });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default DateCounter;
