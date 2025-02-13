import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../..";
import { fetchTypes } from "../../api/admin/typeApi";
import { fetchBrands } from "../../api/admin/brandApi";
import { observer } from "mobx-react-lite";
import { createDevice } from "../../api/admin/deviceApi";

const CreateDevice = observer(({ onHide }) => {
  const { device } = useContext(userContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, [device]);

  const addInfo = () => {
    setInfo((prev) => [
      ...prev,
      { title: "", description: "", number: Date.now() },
    ]);
  };

  const removeInfo = (number) => {
    setInfo((prev) => prev.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo((prev) =>
      prev.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  // const selectFile = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(prev => selectedFile);
  //   console.log("Файл выбран:", file);
  // };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("brandId", device.selectedBrand.id);
    formData.append("typeId", device.selectedType.id);
    formData.append("img", file);
    formData.append("info", JSON.stringify(info));
    createDevice(formData).then((_) => onHide());
  };

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить устройство</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <Dropdown>
            <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
              {device.selectedType.name || "Выберите тип устройства"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {device.types.map((item) => (
                <Dropdown.Item
                  key={item.id}
                  onClick={() => device.setSelectedType(item)}
                >
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
              {device.selectedBrand.name || "Выберите бренд"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {device.brands.map((item) => (
                <Dropdown.Item
                  key={item.id}
                  onClick={() => device.setSelectedBrand(item)}
                >
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            type="text"
            placeholder="Название устройства"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            type="number"
            placeholder="Цена устройства"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Form.Control
            type="file"
            placeholder="Изображение устройства"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <hr />
          <Button variant="outline-secondary" onClick={addInfo}>
            Добавить новое свойство
          </Button>
          {info?.map((item) => (
            <div
              key={item.number}
              style={{
                marginTop: 15,
                display: "flex",
                flexDirection: "column",
                gap: 15,
                padding: 10,
                border: "1px solid gray",
                borderRadius: 8,
              }}
            >
              <Form.Control
                placeholder="Введите название характеристики"
                value={item.title}
                onChange={(e) =>
                  changeInfo("title", e.target.value, item.number)
                }
              />
              <Form.Control
                placeholder="Введите описание характеристики"
                value={item.description}
                onChange={(e) =>
                  changeInfo("description", e.target.value, item.number)
                }
              />
              <Button
                variant="outline-danger"
                onClick={() => removeInfo(item.number)}
              >
                Удалить свойство
              </Button>
            </div>
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={addDevice}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
