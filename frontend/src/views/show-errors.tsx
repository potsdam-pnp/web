import { useContext } from "react";
import { Alert } from "react-bootstrap";
import { CardDeckContext, CardDeckDispatchContext } from "./card-deck-context";

export function ShowErrors() {
  const errors = useContext(CardDeckContext).errors;
  const dispatch = useContext(CardDeckDispatchContext);

  return <div>
    {errors.map((value, index) => 
      <Alert variant="danger" onClose={() => dispatch({type: "dismiss-error", index: index})} dismissible key={index}>
        {value}
      </Alert>
    )}
  </div>;
}