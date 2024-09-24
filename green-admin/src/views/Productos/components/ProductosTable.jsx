import { Table } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductos } from "../../../redux/actions";

const { Column, HeaderCell, Cell } = Table;

const ProductosTable = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos);

  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  return (
    <Table data={productos} rowHeight={100} autoHeight>
      {[
        { name: "ID", dataKey: "id", width: 100 },
        { name: "MasterFormat", dataKey: "masterformat", width: 200 },
        { name: "Nombre", dataKey: "nombre", width: 400 },
      ].map((item) => (
        <Column key={item.dataKey} width={item.width} resizable>
          <HeaderCell>{item.name}</HeaderCell>
          <Cell dataKey={item.dataKey} />
        </Column>
      ))}
      <Column width={100} fixed="right">
        <HeaderCell></HeaderCell>
        <Cell>
          {(rowData) => {
            return <img src={rowData.img} alt={rowData.nombre} width="100" />;
          }}
        </Cell>
      </Column>
    </Table>
  );
};

export default ProductosTable;
