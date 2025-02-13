import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { userContext } from "../..";
import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = observer(() => {
  const { device } = useContext(userContext);
  return (
    <ListGroup>
      {device.types.map((item) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={item.id === device.selectedType.id}
          key={item.id}
          onClick={() => device.setSelectedType(item)}
        >
          {item.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
