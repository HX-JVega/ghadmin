import { useState } from "react";
import {
  Button,
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Header,
  Input,
  Message,
  Modal,
  Panel,
  Uploader,
} from "rsuite";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { createDistribuidor } from "../../redux/actions";

import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";

const DistCreateModal = ({ open, onClose, isLoaded }) => {
  const dispatch = useDispatch();

  const initialForm = {
    nombre: "",
    direccion: "",
    lat: "",
    lon: "",
    email: "",
    telefono: "",
    webpage: "",
    logo: "",
    ciudad_id: "",
  };

  const [form, setForm] = useState(initialForm);

  const [selectedPlace, setSelectedPlace] = useState({
    lat: -34.603722,
    lng: -58.381592,
  });

  return (
    <Modal open={open} onClose={onClose} size={"lg"}>
      <Container>
        <Header>
          <h3>CREAR NUEVO DISTRIBUIDOR</h3>
          <Message type="info">
            <p>
              En esta sección se pueden crear nuevos <b>DISTRIBUIDORES</b> en la
              Base de Datos.
            </p>
          </Message>
        </Header>
        <Divider />
        <Content>
          <FlexboxGrid>
            <FlexboxGrid.Item colspan={24}>
              <Panel
                bordered
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                header={<h4>SELECCIONAR LOGO </h4>}
              >
                <Uploader
                  multiple={false}
                  listType="picture"
                  accept="image/*"
                  action="https://greenhomes.com.ar/green-back/uploadFile.php"
                  data={{
                    folder: "distribuidores",
                  }}
                  name="file"
                  placeholder="Subir logo"
                  onSuccess={({ fileUrl }) => {
                    setForm({
                      ...form,
                      logo: fileUrl,
                    });
                  }}
                />
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider />
          <FlexboxGrid justify="space-around" style={{ gap: "1em" }}>
            {[
              { label: "Nombre", name: "nombre" },
              { label: "Email", name: "email" },
              { label: "Teléfono", name: "telefono" },
              { label: "Webpage", name: "webpage" },
            ].map((item) => (
              <FlexboxGrid.Item colspan={11} key={item.name}>
                <Input
                  placeholder={item.label}
                  value={form[item.name]}
                  onChange={(value) => {
                    setForm({
                      ...form,
                      [item.name]: value,
                    });
                  }}
                />
              </FlexboxGrid.Item>
            ))}
          </FlexboxGrid>
          <Divider />
          {isLoaded && (
            <FlexboxGrid
              style={{
                gap: "1em",
              }}
            >
              <FlexboxGrid.Item colspan={24}>
                <Message type="info">
                  <p>
                    En esta sección se puede seleccionar la <b>DIRECCIÓN</b>{" "}
                    donde se encuentra el <b>DISTRIBUIDOR</b>.
                  </p>
                  <p>
                    Para ello debe ingresar en el campo de búsqueda una
                    dirección y presionar enter. Luego se mostrarán los
                    resultados de la búsqueda en el desplegable para seleccionar
                    la dirección deseada.
                  </p>
                </Message>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={24}>
                <FlexboxGrid justify="space-around" style={{ gap: "1em" }}>
                  <FlexboxGrid.Item colspan={10}>
                    <PlacesAutocomplete
                      value={form.direccion}
                      onSelect={(value) => {
                        setForm({
                          ...form,
                          direccion: value,
                        });
                        geocodeByAddress(value)
                          .then((results) => {
                            setSelectedPlace({
                              lat: results[0].geometry.location.lat(),
                              lng: results[0].geometry.location.lng(),
                            });
                          })
                          .catch((error) => console.error(error));
                      }}
                      onChange={(value) => {
                        setForm({
                          ...form,
                          direccion: value,
                        });
                      }}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                      }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: "Buscar dirección...",
                            })}
                            style={{
                              width: "100%",
                              height: "40px",
                              fontSize: "1.2em",
                              padding: "0.5em",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              zIndex: 9999,
                              backgroundColor: "white",
                              color: "black",
                              cursor: "pointer",
                              width: "100%",
                              overflow: "auto",
                              border: "1px solid grey",
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.5em",
                            }}
                          >
                            {loading && (
                              <div
                                style={{
                                  zIndex: 9999,
                                  backgroundColor: "grey",
                                  color: "white",
                                  cursor: "pointer",
                                }}
                              >
                                Cargando...
                              </div>
                            )}

                            {suggestions.map((suggestion) => {
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion)}
                                  key={suggestion.description}
                                  style={{
                                    zIndex: 9999,
                                    backgroundColor: suggestion.active
                                      ? "grey"
                                      : "#ffffff",
                                    color: suggestion.active
                                      ? "white"
                                      : "black",
                                    cursor: "pointer",
                                  }}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
                <br />
                <GoogleMap
                  center={selectedPlace}
                  zoom={15}
                  mapContainerStyle={{
                    height: "300px",
                    width: "70%",
                    margin: "auto",
                  }}
                >
                  <Marker position={selectedPlace} />
                </GoogleMap>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          )}
          <Divider />
          <FlexboxGrid
            style={{
              gap: "1em",
            }}
          >
            <Button
              onClick={() => {
                dispatch(createDistribuidor(form));
              }}
            >
              CREAR DISTRIBUIDOR
            </Button>

            <Button
              onClick={() => {
                setForm(initialForm);
                onClose();
              }}
            >
              CANCELAR
            </Button>
          </FlexboxGrid>
        </Content>
      </Container>
    </Modal>
  );
};

export default DistCreateModal;
