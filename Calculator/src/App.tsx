import { useEffect, useReducer } from "react";
import "./App.css";
import ACTIONS from "./constants";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButtons";

type state = {
  previousOperand: string;
  currentOperand: string;
  operation: string | undefined;
};

const IntegerFormatter = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

const formatOperand = (operand: string) => {
  if (operand === ``) return;
  let [integer, decimal] = operand.split(".");
  if (decimal === undefined) return IntegerFormatter.format(+integer);
  return `${IntegerFormatter.format(+integer)}.${IntegerFormatter.format(
    +decimal
  )}`;
};

const compute = ({ previousOperand, currentOperand, operation }: state) => {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case `+`:
      computation = prev + current;
      break;
    case `-`:
      computation = prev - current;
      break;
    case `*`:
      computation = prev * current;
      break;
    case `/`:
      computation = prev / current;
      break;
  }
  return String(computation);
};

const reducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload === "0" && state.currentOperand === "0") return state;
      if (payload === "." && state.currentOperand.includes(".")) return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand}${payload}`,
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.currentOperand === ``) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: `` };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.CHOOSE_OPERATIONS:
      if (state.currentOperand === `` && state.previousOperand === ``)
        return state;
      if (state.currentOperand === ``) {
        return {
          ...state,
          operation: payload,
        };
      }
      if (state.previousOperand === ``) {
        return {
          previousOperand: state.currentOperand,
          currentOperand: ``,
          operation: payload,
        };
      }
      return {
        previousOperand: compute(state),
        currentOperand: ``,
        operation: payload,
      };
    case ACTIONS.CLEAR:
      return { previousOperand: ``, currentOperand: ``, operation: undefined };
    case ACTIONS.COMPUTE:
      if (
        state.previousOperand === `` ||
        state.currentOperand === `` ||
        state.operation === undefined
      )
        return state;
      return {
        previousOperand: ``,
        currentOperand: compute(state),
        operation: undefined,
      };
    default:
      return state;
  }
};

const initialState = {
  previousOperand: ``,
  currentOperand: ``,
  operation: undefined,
};

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="calculator-grid">
      <div className="screen">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton dispatch={dispatch} operation="/" />
      <DigitButton dispatch={dispatch} digit="1" />
      <DigitButton dispatch={dispatch} digit="2" />
      <DigitButton dispatch={dispatch} digit="3" />
      <OperationButton dispatch={dispatch} operation="*" />
      <DigitButton dispatch={dispatch} digit="4" />
      <DigitButton dispatch={dispatch} digit="5" />
      <DigitButton dispatch={dispatch} digit="6" />
      <OperationButton dispatch={dispatch} operation="+" />
      <DigitButton dispatch={dispatch} digit="7" />
      <DigitButton dispatch={dispatch} digit="8" />
      <DigitButton dispatch={dispatch} digit="9" />
      <OperationButton dispatch={dispatch} operation="-" />
      <DigitButton dispatch={dispatch} digit="." />
      <DigitButton dispatch={dispatch} digit="0" />
      <button onClick={() => dispatch({ type: ACTIONS.COMPUTE })}>=</button>
    </div>
  );
}

export default App;
