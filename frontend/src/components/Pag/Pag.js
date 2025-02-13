import { observer } from "mobx-react-lite";
import { useContext } from "react";
import Pagination from "react-bootstrap/Pagination";
import { userContext } from "../..";

const Pag = observer(() => {
  const { device } = useContext(userContext);
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }
  return (
    <Pagination>
      {pages.map((page, index) => (
        <Pagination.Item
          active={device.page === page}
          onClick={() => device.setPage(page)}
          key={index}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pag;
