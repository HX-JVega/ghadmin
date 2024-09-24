import { Container, Content, Divider, Header, Message, Panel } from "rsuite";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getFabricantes } from "../../redux/actions";
import GHTable from "../../components/GHTable";
import FabDetailModal from "./FabDetailModal";
import FabCreateModal from "./FabCreateModal";
import useAuth from "../../hooks/useAuth";
import FabBulkCreate from "./FabBulkCreate";

const Fabricantes = () => {
  const dispatch = useDispatch();
  const fabricantes = useSelector((state) => state.fabricantes);
  const { checkLogin } = useAuth();

  checkLogin();

  useEffect(() => {
    dispatch(getFabricantes());
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
        <h1>FABRICANTES</h1>
        <Message type="info">
          <p>
            En esta sección se pueden inspeccionar los fabricantes que se
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
          propsNames={[
            "id",
            "logo",
            "nombre",
            "email",
            "telefono",
            "num_productos",
          ]}
          data={fabricantes}
          createModal={<FabCreateModal />}
          detailModal={<FabDetailModal />}
          bulkCreateModal={<FabBulkCreate />}
        />
      </Content>
    </Container>
  );
};

export default Fabricantes;
