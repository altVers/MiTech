import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { createBrand } from "../../api/admin/brandApi";
import { useState } from "react";

const CreateBrand = ({ onHide }) => {
  const [brand, setBrand] = useState("");

  const addBrand = () => {
    createBrand({ name: brand }).then((_) => setBrand(""));
    onHide();
  };

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить бренд</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="brandName">
            <Form.Label>Название бренда</Form.Label>
            <Form.Control type="text" placeholder="Введите название бренда" value={brand} onChange={(e) => setBrand(e.target.value)}/>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={() => addBrand()}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;
