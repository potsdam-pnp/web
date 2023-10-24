import { useContext } from "react";
import { CardDeckContext, CardDeckDispatchContext } from "./card-deck-context";

export function ShowErrors() {
  const errors = useContext(CardDeckContext).errors;
  const dispatch = useContext(CardDeckDispatchContext);

  return <div>
    {errors.map((value, index) => 
      <div className="alert alert-danger d-flex justify-content-between" key={index} role="alert">
        {value}
        <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch({type: "dismiss-error", index: index})}>
        </button>
      </div>)}
  </div>;
}