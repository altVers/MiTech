import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { userContext } from "../..";
import Card from "react-bootstrap/Card";

const BrandBar = observer(() => {
  const { device } = useContext(userContext);
  return (
    <div className="d-flex gap-2">
      {device.brands.map((brand) => (
        <Card
          style={{ cursor: "pointer" }}
          border={brand.id === device.selectedBrand.id ? "success" : ""}
          onClick={() => device.setSelectedBrand(brand)}
          className="p-2"
          key={brand.id}
        >
          {brand.name}
        </Card>
      ))}
    </div>
  );
});

export default BrandBar;
