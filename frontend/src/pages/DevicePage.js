import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";
import { fetchOneDevices } from "../api/admin/deviceApi";

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  useEffect(() => {
    fetchOneDevices(id).then((data) => setDevice(data));
  }, [id]);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Image src={process.env.REACT_APP_API_URL + '/' + device.img} width={300} height={300} />
        </Col>
        <Col md={4}>
          <h2>{device.name}</h2>
          <p>Цена: {device.price}</p>
          <p>Рейтинг: {device.rating}</p>
        </Col>
        <Col md={4}>
          <Button variant="outline-dark">Добавить в корзину</Button>
        </Col>
      </Row>
      <Row>
        {device.info.map((info) => (
          <Row key={info.id}>
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default DevicePage;
