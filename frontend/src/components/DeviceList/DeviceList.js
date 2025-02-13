import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { userContext } from "../..";
import Row from "react-bootstrap/esm/Row";
import DeviceItem from "../DeviceItem/DeviceItem";

const DeviceList = observer(() => {
  const { device } = useContext(userContext);
  return <Row className="d-flex g-3" style={{alignItems: 'stretch'}}>
    {device.devices.map((device) => <DeviceItem key={device.id} device={device}/>)}
  </Row>;
});

export default DeviceList;
