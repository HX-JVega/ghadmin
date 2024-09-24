import {
  Button,
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Header,
  List,
  Message,
  Modal,
  Stack,
  Uploader,
} from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import EditRow from "../../components/EditRow";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { getFabricantes, updateRegister } from "../../redux/actions";
import DetailImg from "../../components/DetailImg";

const ConfirmModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose} size={"xs"}>
      <Modal.Header>
        <Modal.Title>
          <b>Eliminar</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Message type="error">
          <p>
            <b>¿Está seguro que desea eliminar este fabricante?</b>
          </p>
          <p>
            <b>Esta acción no se puede deshacer.</b>
          </p>
        </Message>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} appearance="subtle">
          Cancelar
        </Button>
        <Button onClick={onConfirm} appearance="primary">
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const FabDetailModal = ({ open, onClose, detailId, detail }) => {
  const dispatch = useDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onConfirmClose = () => {
    setConfirmOpen(false);
  };

  const onConfirm = async () => {
    setConfirmOpen(false);
    onClose();
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    const res = await axios.delete(
      "http://greenhomes.com.ar/green-back/deleteFabricante.php",
      {
        data: {
          id: detailId,
        },
      }
    );

    if (!res.error) {
      Swal.fire({
        icon: "success",
        title: "Fabricante eliminado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al eliminar el fabricante",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
    dispatch(getFabricantes());
  };

  return (
    <Modal open={open} onClose={onClose} size={"lg"}>
      <Container>
        <Header>
          <FlexboxGrid
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <FlexboxGridItem>
              <h1>{detail?.nombre}</h1>
            </FlexboxGridItem>
            <FlexboxGridItem
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
                          entity: "fabricantes",
                          id: detailId,
                          property: "logo",
                          value: "",
                          action: getFabricantes,
                        })
                      );
                    }}
                  >
                    Eliminar Logo
                  </Button>
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
                        entity: "fabricantes",
                        id: detailId,
                        property: "logo",
                        value: fileUrl,
                        action: getFabricantes,
                      })
                    );
                  }}
                />
              )}
            </FlexboxGridItem>
          </FlexboxGrid>
        </Header>
        <Divider />
        <Content>
          <List>
            {[
              {
                label: "Nombre",
                value: detail?.nombre,
                property: "nombre",
              },
              {
                label: "Dirección",
                value: detail?.direccion,
                property: "direccion",
              },
              {
                label: "Webpage",
                value: detail?.webpage,
                property: "webpage",
              },
              {
                label: "Email",
                value: detail?.email,
                property: "email",
              },
              {
                label: "Teléfono",
                value: detail?.telefono,
                property: "telefono",
              },
              {
                label: "Cantidad de Productos",
                value: detail?.num_productos ? detail?.num_productos : "0",
                readOnly: true,
              },
            ].map((item) => (
              <EditRow
                label={item.label}
                value={item.value}
                key={item.label}
                readOnly={item.readOnly}
                entity={"fabricantes"}
                property={item.property}
                id={detailId}
                action={getFabricantes}
              />
            ))}
          </List>
          <Divider />
          <Button
            appearance="primary"
            color="red"
            style={{
              width: "100%",
              height: "100%",
            }}
            onClick={() => setConfirmOpen(true)}
            disabled={detail?.num_productos > 0}
          >
            <b>Eliminar</b>
          </Button>
        </Content>
      </Container>
      <ConfirmModal
        open={confirmOpen}
        onClose={onConfirmClose}
        onConfirm={onConfirm}
      />
    </Modal>
  );
};

export default FabDetailModal;
