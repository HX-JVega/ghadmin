import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Content,
  Divider,
  Header,
  Message,
  Panel,
} from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { getAllMaster } from "../../redux/actions";
import MasterModal from "./MasterModal";

const DivisionPanel = ({ item }) => {
  return (
    <Panel header={item.label} collapsible bordered key={item.value}>
      <br />
      <br />

      {item.children.map((child) => (
        <Panel
          header={child.label}
          collapsible
          bordered
          key={child.value}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            margin: "auto",
          }}
        >
          {child.children.map((child2) => (
            <Panel
              header={child2.label}
              bordered
              key={child2.value}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
                margin: "auto",
              }}
            />
          ))}
        </Panel>
      ))}
    </Panel>
  );
};

const MasterFormat = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const master = useSelector((state) => state.master);

  useEffect(() => {
    dispatch(getAllMaster());
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
        <h1>MASTERFORMAT</h1>
        <Message type="info">
          <p>
            En esta sección se pueden inspeccionar las categorías de
            MasterFormat que se encuentran cargadas en la Base de Datos.
          </p>
          <p>
            Si no encuentras cargada en la Base de Datos la especificación
            deseada, puedes realizar la carga desde
            <Button appearance="link" onClick={() => setOpen(true)}>
              aquí
            </Button>
          </p>
        </Message>
      </Header>
      <Divider />
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          margin: "auto",
        }}
      >
        {master.map((item) => (
          <DivisionPanel item={item} key={item.value} />
        ))}
      </Content>
      <MasterModal open={open} onClose={() => setOpen(false)} />
    </Container>
  );
};

export default MasterFormat;
