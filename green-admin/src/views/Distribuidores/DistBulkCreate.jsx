import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Header,
  Message,
  Modal,
  Table,
} from "rsuite";
import Papa from "papaparse";
import { bulkCreateDistribuidores } from "../../redux/actions";

const DistBulkCreate = ({ open, onClose }) => {
  const [distribuidoresToCreate, setDistribuidoresToCreate] = useState([]);
  const dispatch = useDispatch();

  const handleFile = (file) => {
    Papa.parse(file, {
      header: true,
      encoding: "UTF-8",
      complete: function (results) {
        const headers = results.meta.fields;
        if (
          !headers.includes("nombre") ||
          !headers.includes("direccion") ||
          !headers.includes("email") ||
          !headers.includes("webpage") ||
          !headers.includes("telefono") ||
          !headers.includes("lat") ||
          !headers.includes("lon")
        ) {
          return setError(
            "El archivo no tiene el formato correcto. Por favor, descargue la plantilla de carga y complétela con los datos correspondientes."
          );
        }
        setDistribuidoresToCreate(results.data.filter((item) => item.nombre));
      },
    });
  };

  return (
    <Modal open={open} onClose={onClose} size={"lg"}>
      <Container>
        <Header>
          <h3>CARGA MASIVA DE DISTRIBUIDORES</h3>
          <Message type="info">
            <p>
              En esta sección se pueden cargar <b>DISTRIBUIDORES</b> de forma
              masiva a la Base de Datos.Para ello, se debe descargar la{" "}
              <a href="https://greenhomes.com.ar/uploads/bulks/bulk_distribuidores.csv">
                <b>PLANTILLA DE CARGA</b>
              </a>{" "}
              y completarla con los datos correspondientes.
            </p>
            <p>
              La plantilla se encuentra en formato <b>CSV</b> y puede ser
              abierta en cualquier planilla de cálculo (Excel, LibreOffice,
              etc.).
            </p>
            <p>
              <b>IMPORTANTE:</b> Los campos marcados con asterisco (*) son
              obligatorios.
            </p>

            <ul>
              <li>
                <b>nombre*</b>: Nombre del distribuidor.
              </li>
              <li>
                <b>direccion</b>: Dirección del distribuidor.
              </li>
              <li>
                <b>email</b>: Email del distribuidor.
              </li>
              <li>
                <b>webpage</b>: Email del distribuidor.
              </li>
              <li>
                <b>telefono</b>: Teléfono del distribuidor.
              </li>
              <li>
                <b>lat*</b>: Latitud de la localización distribuidor.
              </li>
              <li>
                <b>lon*</b>: Longitud de la localización distribuidor
              </li>
            </ul>

            <p>
              <b>NOTA:</b> La carga masiva de distribuidores no admite la carga
              de imágenes. Para cargar una imagen, debe hacerlo de forma
              individual en la sección correspondiente.
            </p>
          </Message>
          <br />
          <input
            type="file"
            accept=".csv"
            onChange={(e) => {
              e.target.files[0] && handleFile(e.target.files[0]);
            }}
          />
        </Header>
        <Divider />
        <Content>
          {distribuidoresToCreate.length > 0 ? (
            <>
              <Message type="info">
                <p>
                  Se han cargado <b>{distribuidoresToCreate.length}</b>{" "}
                  distribuidores.
                </p>
                <p>
                  Por favor, revise los datos y presione el botón{" "}
                  <b>CONFIRMAR</b> para cargarlos a la Base de Datos.
                </p>
              </Message>

              <Table data={distribuidoresToCreate} height={600} wordWrap={true}>
                {[
                  "nombre",
                  "direccion",
                  "email",
                  "webpage",
                  "telefono",
                  "lat",
                  "lon",
                ].map((item) => (
                  <Table.Column key={item} width={200} align="center">
                    <Table.HeaderCell>{item}</Table.HeaderCell>
                    <Table.Cell dataKey={item} />
                  </Table.Column>
                ))}
              </Table>
              <br />
              <FlexboxGrid
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1em",
                }}
              >
                <FlexboxGrid.Item>
                  <Button
                    appearance="primary"
                    color="red"
                    onClick={() => {
                      setDistribuidoresToCreate([]);
                    }}
                  >
                    CANCELAR
                  </Button>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <Button
                    appearance="primary"
                    color="green"
                    onClick={() => {
                      dispatch(
                        bulkCreateDistribuidores(distribuidoresToCreate)
                      );
                      setDistribuidoresToCreate([]);
                      onClose();
                    }}
                  >
                    CONFIRMAR
                  </Button>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </>
          ) : (
            <></>
          )}
        </Content>
      </Container>
    </Modal>
  );
};

export default DistBulkCreate;
