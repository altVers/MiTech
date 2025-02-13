import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import TypeBar from "../components/TypeBar/TypeBar";
import BrandBar from "../components/BrandBar/BrandBar";
import DeviceList from "../components/DeviceList/DeviceList";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { userContext } from "..";
import { fetchTypes } from "../api/admin/typeApi";
import { fetchBrands } from "../api/admin/brandApi";
import { fetchDevices } from "../api/admin/deviceApi";
import Pag from "../components/Pag/Pag";

const ShopPage = observer(() => {
  const { device } = useContext(userContext);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, 1, 2).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device]);

  useEffect(() => {
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      2
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device, device.selectedType.id, device.selectedBrand.id, device.page]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col
          md={9}
          style={{ display: "flex", flexDirection: "column", gap: 15 }}
        >
          <BrandBar />
          <DeviceList />
          <Pag />
        </Col>
      </Row>
    </Container>
  );
});

export default ShopPage;
