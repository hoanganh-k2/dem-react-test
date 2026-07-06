import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = (props) => {
  const { show, setShow, dataResult } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Result quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total question: <b>{dataResult.countTotal}</b>
          </div>
          <div>
            Total correct answers: <b>{dataResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Show answers
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
