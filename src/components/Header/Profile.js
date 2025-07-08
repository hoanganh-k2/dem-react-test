import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ChangeInformation from "./ChangeInformation";
import ChangePassword from "./ChangePassword";
import History from "./History";

const Profile = (props) => {
  const { show, setShow } = props;
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} size="lg" onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Profile user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="your-information" title="Main information">
              <ChangeInformation />
            </Tab>
            <Tab eventKey="change-password" title="Change password">
              <ChangePassword />
            </Tab>
            <Tab eventKey="history" title="History">
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            // onClick={() => {
            //   handleSubmit();
            // }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
