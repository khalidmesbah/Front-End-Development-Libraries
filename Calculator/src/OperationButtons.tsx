import ACTIONS from "./constants";
const OperationButton = ({ dispatch, operation }: any) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATIONS, payload: operation })
      }
    >
      {operation}
    </button>
  );
};

export default OperationButton;
