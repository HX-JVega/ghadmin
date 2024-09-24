import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Content, Divider, Header, Message } from "rsuite";
import { getAllCertificaciones } from "../../redux/actions";
import useAuth from "../../hooks/useAuth";
import GHTable from "../../components/GHTable";
import CertCreateModal from "./CertCreateModal";
import CertDetailModal from "./CertDetailModal";
import CertBulkCreate from "./CertBulkCreate";

const Certificaciones = () => {
  const dispatch = useDispatch();
  const { checkLogin } = useAuth();
  checkLogin();

  useEffect(() => {
    dispatch(getAllCertificaciones());
  }, [dispatch]);

  const categoriasCertificaciones = useSelector(
    (state) => state.categoriasCertificaciones
  );

  const certificaciones = useSelector((state) => state.certificaciones);

  return (
    <Container
      style={{
        height: "100%",
        width: "95%",
        margin: "auto",
      }}
    >
      <Header>
        <h1>CERTIFICACIONES</h1>
        <Message type="info">
          <p>
            En esta sección se pueden inspeccionar las certificaciones que se
            encuentran cargadas en la Base de Datos.
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
          propsNames={["id", "codigo", "logo", "nombre", "nombre_categoria"]}
          data={certificaciones}
          filterBy={[
            "nombre_categoria",
            categoriasCertificaciones.map((item) => item.nombre),
          ]}
          createModal={<CertCreateModal />}
          detailModal={<CertDetailModal />}
          bulkCreateModal={<CertBulkCreate />}
          isCertificaciones={true}
        />
      </Content>
    </Container>
  );
};

export default Certificaciones;
