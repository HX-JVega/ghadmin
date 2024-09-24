import {
  Button,
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Header,
  Input,
  List,
  Modal,
  Panel,
  SelectPicker,
  Table,
  Uploader,
} from "rsuite";
import EditRow from "../../components/EditRow";
import DetailImg from "../../components/DetailImg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductoDetail } from "../../redux/actions";

const CertificarProducto = ({ open, onClose, certificaciones }) => {
  return (
    <Modal open={open} onClose={onClose} size={"lg"}>
      <Container>
        <Header>
          <h3>Certificar Producto</h3>
        </Header>
        <Content>
          <Table data={certificaciones} autoHeight>
            <Table.Column flexGrow={2}>
              <Table.HeaderCell>Nombre</Table.HeaderCell>
              <Table.Cell dataKey="nombre" />
            </Table.Column>
            <Table.Column flexGrow={2}>
              <Table.HeaderCell>Puntos Asignados</Table.HeaderCell>
              <Table.Cell dataKey="puntos">
                {(rowData) => (
                  <span>{Number(rowData.puntos) || "Pre-requisito"}</span>
                )}
              </Table.Cell>
            </Table.Column>
          </Table>
        </Content>
      </Container>
    </Modal>
  );
};

const ProdDetailModal = ({ open, onClose, detailId }) => {
  const dispatch = useDispatch();
  const [certOpen, setCertOpen] = useState(false);

  useEffect(() => {
    detailId && dispatch(getProductoDetail(detailId));
  }, [dispatch, detailId]);

  const productoDetail = useSelector((state) => state.productoDetail);

  return (
    <Modal open={open} onClose={onClose} size={"lg"}>
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
            <h3>{productoDetail?.nombre}</h3>
            <DetailImg src={productoDetail?.img} alt={productoDetail?.nombre} />
          </FlexboxGrid>
        </Header>
        <Content>
          <List>
            {[
              {
                label: "Nombre",
                value: productoDetail?.nombre,
              },
              {
                label: "Descripción",
                value: productoDetail?.descripcion,
              },
              {
                label: "MasterFormat",
                value: `${productoDetail?.masterformat}`,
              },
              {
                label: "Categoría",
                value: productoDetail?.categoria,
              },
              {
                label: "Certificación",
                value: productoDetail?.certificacion,
              },
              {
                label: "Transmitancia",
                value: productoDetail?.transmitancia,
              },
              {
                label: "Resistencia",
                value: productoDetail?.resistencia,
              },
              {
                label: "Factor Solar",
                value: productoDetail?.factor_solar,
              },
              {
                label: "Energía",
                value: productoDetail?.energia,
              },
              {
                label: "Gas",
                value: productoDetail?.gas,
              },
              {
                label: "Agua",
                value: productoDetail?.agua,
              },
            ].map((item) => (
              <EditRow label={item.label} value={item.value} key={item.label} />
            ))}
          </List>
          <Divider />
          <Button
            style={{ marginTop: "1rem" }}
            appearance="primary"
            block
            onClick={() => setCertOpen(true)}
          >
            CERTIFICAR PRODUCTO
          </Button>
          <Divider />
          <FlexboxGrid style={{ marginTop: "1rem", gap: "1em" }}>
            <FlexboxGrid.Item colspan={12}>
              <Header>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img
                    src={"https://greenhomes.com.ar/img/AGBC_blanco.png"}
                    alt="logo"
                    style={{
                      width: "60px",

                      backgroundColor: "grey",
                      borderRadius: "50%",
                    }}
                  />
                  <h4>Archivos del Producto</h4>
                </div>
              </Header>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={24}>
              <Panel bordered>
                <Header>
                  <Uploader
                    action="//jsonplaceholder.typicode.com/posts/"
                    draggable
                    multiple={false}
                  >
                    <div
                      style={{
                        height: 200,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span>Seleccionar Archivo</span>
                    </div>
                  </Uploader>
                </Header>
                <Content>
                  <label>Título</label>
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Ingrese el título del archivo"
                    required
                  />
                  <br />
                  <label>Tipo de Archivo</label>
                  <SelectPicker
                    data={[
                      {
                        label: "CAD",
                        value: "cad",
                      },
                      {
                        label: "SPEC",
                        value: "spec",
                      },
                      {
                        label: "BIM",
                        value: "bim",
                      },
                      {
                        label: "CATÁLOGO",
                        value: "catalogo",
                      },
                      {
                        label: "OTRO",
                        value: "otro",
                      },
                    ]}
                    style={{ width: "100%" }}
                    searchable={false}
                  />
                  <Button
                    style={{ marginTop: "1rem" }}
                    appearance="primary"
                    block
                  >
                    Subir
                  </Button>
                </Content>
              </Panel>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={24}>
              <Panel bordered>
                <Table data={productoDetail?.archivos} autoHeight>
                  <Table.Column flexGrow={1}>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.Cell dataKey="nombre" />
                  </Table.Column>
                  <Table.Column flexGrow={1}>
                    <Table.HeaderCell>Fecha</Table.HeaderCell>
                    <Table.Cell dataKey="fecha" />
                  </Table.Column>
                  <Table.Column flexGrow={1}>
                    <Table.HeaderCell>Descripción</Table.HeaderCell>
                    <Table.Cell dataKey="descripcion" />
                  </Table.Column>
                </Table>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
      <CertificarProducto
        open={certOpen}
        onClose={() => setCertOpen(false)}
        producto_id={detailId}
        certificaciones={productoDetail?.certificaciones}
      />
    </Modal>
  );
};

export default ProdDetailModal;
