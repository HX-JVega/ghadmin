import { Container, Content, Divider, Header, Message } from "rsuite";
import useAuth from "../../hooks/useAuth";
import GHTable from "../../components/GHTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDistribuidores } from "../../redux/actions";
import DistDetailModal from "./DistDetailModal";
import DistCreateModal from "./DistCreateModal";
import { useLoadScript } from "@react-google-maps/api";
import { PLACES } from "../../helpers/consts";
import DistBulkCreate from "./DistBulkCreate";

const Distribuidores = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBhuJcIzk2CBlXcQaQ3buzY5NsWmC7L7NI",
    libraries: PLACES,
  });

  const dispatch = useDispatch();
  const distribuidores = useSelector((state) => state.distribuidores);
  const { checkLogin } = useAuth();
  checkLogin();

  useEffect(() => {
    dispatch(getDistribuidores());
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
        <h1>DISTRIBUIDORES</h1>
        <Message type="info">
          <p>
            En esta sección se pueden inspeccionar los distribuidores que se
            encuentran cargados en la Base de Datos.
          </p>
          <br></br>
          {/* <VideoModal
            text="Tutorial de esta sección"
            video="https://www.greenhomes.com.ar/uploads/prueba.mp4"
          /> */}
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
          propsNames={["id", "logo", "nombre", "email", "telefono"]}
          data={distribuidores}
          detailModal={<DistDetailModal />}
          createModal={<DistCreateModal />}
          bulkCreateModal={<DistBulkCreate />}
          isLoaded={isLoaded}
        />
      </Content>
    </Container>
  );
};

export default Distribuidores;
