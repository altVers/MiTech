import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { createType } from "../../api/admin/typeApi";

const CreateType = ({ onHide }) => {
  const [type, setType] = useState('')

  const addType = () => {
    createType({name: type}).then(_ => setType(''))
    onHide()
  }

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить тип</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="typeName">
            <Form.Label>Название типа</Form.Label>
            <Form.Control type="text" placeholder="Введите название типа" value={type} onChange={(e) => setType(e.target.value)}/>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={() => addType()}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;
