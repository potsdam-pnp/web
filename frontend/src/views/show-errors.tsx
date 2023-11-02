import { useContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { CardDeckContext, CardDeckDispatchContext } from "./card-deck-context";

export function ShowErrors() {
  const errors = useContext(CardDeckContext).errors;
  const dispatch = useContext(CardDeckDispatchContext);

  const maxToasts = 4;

  return <ToastContainer position="top-center">
    {Array.from({length: maxToasts}, (_, index) => {
      return <Toast show={index < errors.length} className="text-bg-danger m-3" onClose={() => dispatch({type: "dismiss-error", index: index})}>
        <Toast.Header>Error</Toast.Header>
        <Toast.Body>{errors[index] ?? ""}</Toast.Body>
      </Toast>
    })}
    </ToastContainer>;
}