import { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { CardDeckContext, CardDeckDispatchContext } from "./card-deck-context";


export function ImportDialog() {
  const { currentlyImporting } = useContext(CardDeckContext);
  const dispatch = useContext(CardDeckDispatchContext);

  function dontImport() {
    dispatch({ type: "card-deck-import-dismiss" })
  }

  function doImport() {
    dispatch({ type: "card-deck-import" })
  }
  

  return <>
    <Modal show={currentlyImporting != null} onHide={dontImport}>
    <Modal.Header closeButton>
      <Modal.Title>Import card deck</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Do you want to import the <strong>{currentlyImporting?.name}</strong> card deck?
      It consists of {currentlyImporting?.cards.length} cards.
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={dontImport}>Don't import</Button>
      <Button variant="primary" onClick={doImport}>Import card deck</Button>
    </Modal.Footer>
  </Modal>
   </>
}