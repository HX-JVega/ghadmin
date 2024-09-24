import { Container, Content, Divider, Header, List } from "rsuite";
import CheckOutlineIcon from "@rsuite/icons/CheckOutline";
import WaitIcon from "@rsuite/icons/Wait";

const StatusIcon = ({ status }) => {
  switch (status) {
    case "success":
      return (
        <CheckOutlineIcon
          color="green"
          style={{ marginRight: "1em", marginLeft: "1em", fontSize: "2em" }}
        />
      );
    case "pending":
      return (
        <WaitIcon
          color="orange"
          style={{ marginRight: "1em", marginLeft: "1em", fontSize: "2em" }}
        />
      );
    default:
      return null;
  }
};

const Logs = () => {
  return (
    <Container>
      <Header>
        <h3>LOGS</h3>
      </Header>
      <Divider />
      <Content>
        <h4>2023/12/08</h4>
        <List>
          {[
            { status: "success", text: "Alta División de MasterFormat" },
            { status: "success", text: "Alta Sección de MasterFormat" },
            { status: "success", text: "Alta Subidivisión de MasterFormat" },
            { status: "success", text: "Alta Individual de Producto" },
          ].map((item) => (
            <List.Item>
              <StatusIcon status={item.status} />
              <span>{item.text}</span>
            </List.Item>
          ))}
        </List>
        <Divider />
        <h4>2023/12/09</h4>
        <List>
          {[
            {
              status: "pending",
              text: "Alta Individual de Fabricante de Producto",
            },
            { status: "pending", text: "Alta Individual de Distribuidores" },
            { status: "pending", text: "Georeferencia de Distribuidores" },
            { status: "pending", text: "Alta Múltiple de Productos" },
            { status: "pending", text: "Alta de Certificación Green Homes" },
          ].map((item) => (
            <List.Item>
              <StatusIcon status={item.status} />
              <span>{item.text}</span>
            </List.Item>
          ))}
        </List>
        <Divider />
        <h4>2023/12/10</h4>
        <List>
          {[
            {
              status: "pending",
              text: "Alta Individual de Fabricante de Producto",
            },
            { status: "pending", text: "Edición Individual de Certificación" },
            { status: "pending", text: "Edición Individual de Producto" },
            { status: "pending", text: "Edición Individual de Fabricante" },
            { status: "pending", text: "Edición Individual de Distribuidor" },
          ].map((item) => (
            <List.Item>
              <StatusIcon status={item.status} />
              <span>{item.text}</span>
            </List.Item>
          ))}
        </List>
        <Divider />
        <h4>2023/12/11</h4>
        <List>
          {[
            {
              status: "pending",
              text: "Alta de Archivos",
            },
            { status: "pending", text: "Nube de Archivos Green Homes" },
            {
              status: "pending",
              text: "Certificación Individual de Productos",
            },
            { status: "pending", text: "Flujo Alta de Usuarios" },
            { status: "pending", text: "Visión/Inspección de Usuarios" },
          ].map((item) => (
            <List.Item>
              <StatusIcon status={item.status} />
              <span>{item.text}</span>
            </List.Item>
          ))}
        </List>
        <Divider />
        <h4>2023/12/12</h4>
        <List>
          {[
            {
              status: "pending",
              text: "Visualización Productos Reales: listado, filtros, íconos de certificación, información fabricante, catálogo",
            },
            { status: "pending", text: "Inspección de Obras y Proyectos" },
            {
              status: "pending",
              text: "Sugerencia de Distribuidores según ubicación geográfica",
            },
            {
              status: "pending",
              text: "Generación de Usuarios Internos 3 niveles + Admin (IMPORTANTE: a partir de las 00:00hs (ARG) Admin solo disponible con credenciales)",
            },
          ].map((item) => (
            <List.Item>
              <StatusIcon status={item.status} />
              <span>{item.text}</span>
            </List.Item>
          ))}
        </List>
        <Divider />
        <h4>2023/12/13</h4>
        <List>
          {[
            {
              status: "pending",
              text: "Vistas completas de Sección Calculadoras",
            },
            {
              status: "pending",
              text: "Reflejo completo de BE en FE",
            },
          ].map((item) => (
            <List.Item>
              <StatusIcon status={item.status} />
              <span>{item.text}</span>
            </List.Item>
          ))}
        </List>
      </Content>
    </Container>
  );
};

export default Logs;
