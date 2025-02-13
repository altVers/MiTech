import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import CreateType from "../components/Modals/CreateType";
import CreateBrand from "../components/Modals/CreateBrand";
import CreateDevice from "../components/Modals/CreateDevice";

const AdminPage = () => {
  const [modal, setModal] = useState(null);

  return (
    <Container className="d-flex flex-column gap-3 mt-3">
      {modal ? (
        modal
      ) : (
        <>
          <Button
            variant="outline-dark"
            onClick={() =>
              setModal(<CreateType onHide={() => setModal(null)} />)
            }
          >
            Добавить тип
          </Button>
          <Button
            variant="outline-dark"
            onClick={() =>
              setModal(<CreateBrand onHide={() => setModal(null)} />)
            }
          >
            Добавить бренд
          </Button>
          <Button
            variant="outline-dark"
            onClick={() =>
              setModal(<CreateDevice onHide={() => setModal(null)} />)
            }
          >
            Добавить устройство
          </Button>
        </>
      )}
    </Container>
  );
};

export default AdminPage;
