import { Container, Content, Divider, Header, Message } from "rsuite";

import GHTable from "../../components/GHTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductos } from "../../redux/actions";
import ProdDetailModal from "./ProdDetailModal";
import ProdCreateModal from "./ProdCreateModal";

const Productos = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos);

  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  return (
    <Container
      style={{
        height: "100%",
        width: "95%",
        margin: "auto",
      }}
    >
      <Header>
        <h1>PRODUCTOS</h1>
        <Message type="info">
          <p>
            En esta sección se pueden inspeccionar los productos que se
            encuentran cargados en la Base de Datos.
          </p>
          <br></br>
        </Message>
      </Header>
      <Divider />
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <GHTable
          propsNames={["id", "img", "masterformat", "nombre"]}
          data={productos}
          detailModal={<ProdDetailModal />}
          createModal={<ProdCreateModal />}
        />
      </Content>
    </Container>
  );
};

export default Productos;
