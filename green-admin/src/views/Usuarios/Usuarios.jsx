import { Container, Content, Divider, Header, Message } from "rsuite";
import useAuth from "../../hooks/useAuth";
import GHTable from "../../components/GHTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../redux/actions";

const Usuarios = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const { checkLogin } = useAuth();
  checkLogin();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <Container
      style={{
        height: "100%",
        width: "95%",
        margin: "auto",
      }}
    >
      <Header>
        <h1>
          <b>USUARIOS</b>
        </h1>
      </Header>
      <Message type="info">
        <p>
          En esta sección se pueden inspeccionar los usuarioss que se encuentran
          cargados en la Base de Datos.
        </p>
        <br></br>
      </Message>
      <Divider />
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <GHTable
          propsNames={["id", "nombre", "email", "tipo_cuenta", "verificado"]}
          data={users}
          detailModal={null}
        />
      </Content>
    </Container>
  );
};

export default Usuarios;
