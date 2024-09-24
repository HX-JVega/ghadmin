import {
  Button,
  Container,
  Content,
  FlexboxGrid,
  Header,
  List,
  Modal,
  Stack,
  Uploader,
} from "rsuite";
import EditRow from "../../components/EditRow";
import DetailImg from "../../components/DetailImg";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { getDistribuidores, updateRegister } from "../../redux/actions";

const DistDetailModal = ({ open, onClose, detail, isLoaded, detailId }) => {
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
                          entity: "distribuidores",
                          id: detailId,
                          property: "logo",
                          value: "",
                          action: getDistribuidores,
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
                    folder: "fabricantes",
                  }}
                  name="file"
                  placeholder="Subir logo"
                  onSuccess={({ fileUrl }) => {
                    dispatch(
                      updateRegister({
                        entity: "distribuidores",
                        id: detailId,
                        property: "logo",
                        value: fileUrl,
                        action: getDistribuidores,
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
                title: "Nombre",
                content: detail?.nombre,
                property: "nombre",
              },
              {
                title: "Dirección",
                content: detail?.direccion,
                property: "direccion",
              },
              {
                title: "Teléfono",
                content: detail?.telefono,
                property: "telefono",
              },
              {
                title: "Email",
                content: detail?.email,
                property: "email",
              },
              {
                title: "Web",
                content: detail?.webpage,
                property: "webpage",
              },
            ].map((item, index) => (
              <EditRow
                key={index}
                label={item.title}
                value={item.content}
                edit={false}
                entity={"distribuidores"}
                property={item.property}
                id={detailId}
                action={getDistribuidores}
              />
            ))}
          </List>

          <br />
          {isLoaded && (
            <GoogleMap
              center={{
                lat: Number(detail?.lat),
                lng: Number(detail?.lon),
              }}
              zoom={15}
              mapContainerStyle={{
                height: "300px",
                width: "70%",
                margin: "auto",
              }}
            >
              <Marker
                position={{
                  lat: Number(detail?.lat),
                  lng: Number(detail?.lon),
                }}
              />
            </GoogleMap>
          )}

          <FlexboxGrid>
            <FlexboxGrid.Item colspan={24}>
              <Button
                appearance="primary"
                color="red"
                style={{
                  width: "100%",
                }}
                onClick={(e) => console.log(e)}
              >
                ELIMINAR DISTRIBUIDOR
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </Modal>
  );
};

export default DistDetailModal;
