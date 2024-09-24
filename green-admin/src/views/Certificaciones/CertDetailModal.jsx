import {
  Button,
  Container,
  Content,
  FlexboxGrid,
  Footer,
  Header,
  List,
  Modal,
  Stack,
  Uploader,
} from "rsuite";
import EditRow from "../../components/EditRow";
import DetailImg from "../../components/DetailImg";
import { getAllCertificaciones, updateRegister } from "../../redux/actions";
import { useDispatch } from "react-redux";

const CertDetailModal = ({ open, onClose, detail, detailId }) => {
  const dispatch = useDispatch();
  return (
    <Modal open={open} onClose={onClose} size={"md"}>
      <Container>
        <Header>
          <FlexboxGrid
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <FlexboxGrid.Item>
              <h3>{detail?.nombre}</h3>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {detail?.logo ? (
                <Stack
                  direction="column"
                  style={{
                    gap: "1em",
                  }}
                >
                  <DetailImg src={detail?.logo} alt={detail?.nombre} />
                  <Button
                    appearance="ghost"
                    color="red"
                    onClick={() => {
                      dispatch(
                        updateRegister({
                          entity: "certificaciones",
                          id: detailId,
                          property: "logo",
                          value: "",
                          action: getAllCertificaciones,
                          isCert: true,
                        })
                      );
                    }}
                  >
                    Eliminar Logo
                  </Button>
                  <br></br>
                </Stack>
              ) : (
                <Uploader
                  multiple={false}
                  listType="picture"
                  accept="image/*"
                  action="https://greenhomes.com.ar/green-back/uploadFile.php"
                  data={{
                    folder: "certificaciones_logos",
                  }}
                  name="file"
                  placeholder="Subir logo"
                  onSuccess={({ fileUrl }) => {
                    dispatch(
                      updateRegister({
                        entity: "certificaciones",
                        id: detailId,
                        property: "logo",
                        value: fileUrl,
                        action: getAllCertificaciones,
                        isCert: true,
                      })
                    );
                  }}
                />
              )}
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Header>
        <Content>
          <List>
            {[
              {
                label: "Nombre",
                value: detail?.nombre,
                property: "nombre",
              },
              {
                label: "Código",
                value: detail?.codigo,
                property: "codigo",
              },
              {
                label: "Propósito",
                value: detail?.proposito,
                property: "proposito",
              },
              {
                label: "Requerimiento",
                value: detail?.requerimiento,
                property: "requerimiento",
              },
              {
                label: "Estandares",
                value: detail?.estandares,
                property: "estandares",
              },
              {
                label: "Rendimiento Ejemplar",
                value: detail?.rendimiento_ejemplar,
                property: "rendimiento_ejemplar",
              },
              {
                label: "Productos Aplicables",
                value: detail?.productos_aplicables,
                property: "productos_aplicables",
              },
              {
                label: "Documentación",
                value: detail?.documentacion,
                property: "documentacion",
              },
              {
                label: "Puntos Posibles",
                value: detail?.puntos,
                property: "puntos",
              },
              {
                label: "Versión",
                value: detail?.version,
                property: "version",
              },
              {
                label: "Categoría",
                value: detail?.nombre_categoria,
                readOnly: true,
              },
            ].map((item, index) => (
              <EditRow
                key={index}
                label={item.label}
                value={item.value}
                entity={"certificaciones"}
                readOnly={item.readOnly}
                property={item.property}
                id={detailId}
                action={getAllCertificaciones}
                isCert={true}
              />
            ))}
          </List>
        </Content>
        <Footer>
          <Button
            onClick={() => {}}
            appearance="primary"
            color="red"
            style={{ marginTop: "1em", width: "100%" }}
          >
            ELIMINAR CERTIFICACIÓN
          </Button>
        </Footer>
      </Container>
    </Modal>
  );
};

export default CertDetailModal;
