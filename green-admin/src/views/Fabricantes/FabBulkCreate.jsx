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
import { useState } from "react";
import useError from "../../hooks/useError";
import { useDispatch } from "react-redux";
import { bulkCreateFabricantes } from "../../redux/actions";

const FabBulkCreate = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch(bulkCreateFabricantes({ fabricantes: fabricantesToCreate }));
    setFabricantesToCreate([]);
  };

  const { setError } = useError();
  const [fabricantesToCreate, setFabricantesToCreate] = useState([]);

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
          !headers.includes("telefono")
        ) {
          return setError(
            "El archivo no tiene el formato correcto. Por favor, descargue la plantilla de carga y complétela con los datos correspondientes."
          );
        }
        setFabricantesToCreate(results.data.filter((item) => item.nombre));
      },
    });
  };

  return (
    <Modal open={open} onClose={onClose} size={"lg"}>
      <Container>
        <Header>
          <h3>CARGA MASIVA DE FABRICANTES</h3>
          <Message type="info">
            <p>
              En esta sección se pueden cargar <b>FABRICANTES</b> de forma
              masiva a la Base de Datos.Para ello, se debe descargar la{" "}
              <a href="https://greenhomes.com.ar/uploads/bulks/bulk_fabricantes.csv">
                <b>PLANTILLA DE CARGA</b>
              </a>
              , completarla con los datos correspondientes y subirla al sistema.
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
                <b>nombre*</b>: Nombre del fabricante.
              </li>
              <li>
                <b>direccion</b>: Nombre del fabricante.
              </li>
              <li>
                <b>email</b>: Email del fabricante.
              </li>
              <li>
                <b>webpage</b>: Email del fabricante.
              </li>
              <li>
                <b>telefono</b>: Teléfono del fabricante.
              </li>
            </ul>
            <p>
              <b>NOTA:</b> La carga masiva de fabricantes no admite la carga de
              logos. Estos deberán ser cargados de forma individual.
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
          {fabricantesToCreate.length > 0 ? (
            <>
              <Message type="info">
                <p>
                  Se han cargado <b>{fabricantesToCreate.length}</b>{" "}
                  fabricantes.
                </p>
                <p>
                  Por favor, revise los datos y presione el botón{" "}
                  <b>CONFIRMAR</b> para cargarlos a la Base de Datos.
                </p>
              </Message>

              <Table data={fabricantesToCreate} height={600}>
                {["nombre", "direccion", "email", "webpage", "telefono"].map(
                  (item) => (
                    <Table.Column key={item} width={250} align="center">
                      <Table.HeaderCell>{item}</Table.HeaderCell>
                      <Table.Cell dataKey={item} />
                    </Table.Column>
                  )
                )}
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
                      setFabricantesToCreate([]);
                    }}
                  >
                    CANCELAR
                  </Button>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <Button
                    appearance="primary"
                    color="green"
                    onClick={handleCreate}
                  >
                    CONFIRMAR
                  </Button>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </>
          ) : (
            <Message type="info">
              <p>
                Para comenzar, por favor, seleccione un archivo con los datos a
                cargar.
              </p>
            </Message>
          )}
        </Content>
        <Divider />
      </Container>
    </Modal>
  );
};

export default FabBulkCreate;
