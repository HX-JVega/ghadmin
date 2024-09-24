import {
  Button,
  ButtonGroup,
  Container,
  Content,
  FlexboxGrid,
  Header,
  Message,
  Table,
  Uploader,
} from "rsuite";
import VisibleIcon from "@rsuite/icons/Visible";
import FileUploadIcon from "@rsuite/icons/FileUpload";

const BASE_URL = "https://greenhomes.com.ar/user_files";

const filesData = [
  {
    id: 1,
    file_name: "auditorias_energeticas",
    label: "Auditorías energéticas",
  },
  {
    id: 2,
    file_name: "barometro_hogares_verdes",
    label: "Barómetro de hogares verdes",
  },
  {
    id: 3,
    file_name: "formulario_empleos_verdes",
    label: "Formulario de empleos verdes",
  },
  {
    id: 4,
    file_name: "guia_hogares_eficientes",
    label: "Guía de hogares eficientes",
  },
  {
    id: 5,
    file_name: "info_ahorro_agua",
    label: "Info ahorro de agua",
  },
  {
    id: 6,
    file_name: "info_ahorro_energia",
    label: "Info ahorro de energía",
  },
];

const Archivos = () => {
  return (
    <Container
      style={{
        height: "100%",
        width: "95%",
        margin: "auto",
      }}
    >
      <Header>
        <h1>ARCHIVOS</h1>
        <Message type="info">
          <p>
            En esta sección se pueden administrar los archivos de descarga de la
            aplicación Green Homes en las distintas secciones.
          </p>
          <p>
            <b>Nota: </b> La funcionalidad de carga, visualización y descarga
            espera que los archivos estén en formato <b>PDF</b>.
          </p>
        </Message>
      </Header>
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {
          <Table
            height={400}
            data={filesData}
            onRowClick={(data) => {
              console.log(data);
            }}
            rowHeight={60}
            autoHeight
          >
            <Table.Column width={100} align="center">
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.Cell dataKey="id" />
            </Table.Column>

            <Table.Column width={500} align="flex-start">
              <Table.HeaderCell>Nombre</Table.HeaderCell>
              <Table.Cell dataKey="label" />
            </Table.Column>

            <Table.Column width={200} align="center">
              <Table.HeaderCell></Table.HeaderCell>
              <Table.Cell>
                {(rowData) => (
                  <FlexboxGrid style={{ gap: "1em" }}>
                    <Button
                      appearance="primary"
                      href={`${BASE_URL}/${rowData.file_name}.pdf`}
                      target="_blank"
                      color="#C1D587"
                      style={{
                        width: "3em",
                        height: "3em",
                      }}
                    >
                      <VisibleIcon />
                    </Button>
                    <Uploader>
                      <Button
                        appearance="primary"
                        color="#C1D587"
                        style={{
                          width: "3em",
                          height: "3em",
                        }}
                      >
                        <FileUploadIcon />
                      </Button>
                    </Uploader>
                  </FlexboxGrid>
                )}
              </Table.Cell>
            </Table.Column>
          </Table>
        }
      </Content>
    </Container>
  );
};

export default Archivos;
