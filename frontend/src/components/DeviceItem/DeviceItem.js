import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import {useNavigate} from 'react-router-dom'
import { DEVICE_ROUTE } from "../../utils/consts";
const DeviceItem = ({device}) => {
const navigate = useNavigate()

console.log(process.env.REACT_APP_API_URL + device.img);

  return <Col md={3} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
    <Card className="p-2" style={{width: '100%', height: '100%' ,cursor: 'pointer'}}>
        <Image src={process.env.REACT_APP_API_URL + '/' + device.img} width="100%" height="100%" style={{objectFit: "contain"}}/>
        <div style={{display: 'flex', flexDirection: "column", gap: 15}}>
            <h4 style={{margin: 0}}>{device.name}</h4>
            <p style={{margin: 0}}>Цена: {device.price} рублей</p>
            <p style={{margin: 0}}>Рейтинг: {device.rating}</p>
        </div>
    </Card>
  </Col>;
};

export default DeviceItem;
