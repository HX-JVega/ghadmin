import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Container,
  Content,
  Divider,
  Footer,
  Header,
  Input,
  Message,
  Modal,
  Panel,
  Uploader,
} from "rsuite";
import { createFabricante } from "../../redux/actions";

const labelDict = {
  nombre: "Nombre",
  direccion: "Dirección",
  webpage: "Sitio web",
  email: "Email",
  telefono: "Teléfono",
};

const FabCreateModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const initialState = {
    nombre: "",
    direccion: "",
    webpage: "",
    email: "",
    telefono: "",
    logo: "",
    folder: "fabricantes",
  };

  const [form, setForm] = useState(initialState);

  const onCancel = () => {
    setForm(initialState);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size={"lg"}>
      <Container>
        <Header>
          <Modal.Header>
            <h3>CREAR NUEVO FABRICANTE</h3>
          </Modal.Header>
          <Message type="info">
            <p>
              Con este formulario pueden darse de alta nuevos <b>FABRICANTES</b>{" "}
              a la Base de Datos.
            </p>
          </Message>
        </Header>
        <Divider />
        <Content>
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
                folder: "fabricantes",
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
          <br />
          {["nombre", "direccion", "webpage", "email", "telefono"].map(
            (item) => {
              return (
                <div key={item}>
                  <Input
                    key={item}
                    label={item}
                    placeholder={labelDict[item]}
                    onChange={(value) => {
                      setForm({
                        ...form,
                        [item]: value,
                      });
                    }}
                    value={form[item]}
                  />
                  <br />
                </div>
              );
            }
          )}
        </Content>
        <Footer>
          <Button
            onClick={() => {
              dispatch(createFabricante(form));
              onCancel();
              onClose();
            }}
            color="green"
            appearance="primary"
          >
            CREAR FABRICANTE
          </Button>
          <Button onClick={onCancel} color="red" appearance="primary">
            CANCELAR
          </Button>
        </Footer>
      </Container>
    </Modal>
  );
};

export default FabCreateModal;
