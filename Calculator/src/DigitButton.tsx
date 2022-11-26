import ACTIONS from "./constants";
const DigitButton = ({ dispatch, digit }: any) => {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: digit })}
    >
      {digit}
    </button>
  );
};

export default DigitButton;
