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
  Rate,
  SelectPicker,
  Uploader,
} from "rsuite";

import {
  getAllMaster,
  getDistribuidores,
  getFabricantes,
  getProductos,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const ProdCreateModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const master = useSelector((state) => state.master);
  const fabricantes = useSelector((state) => state.fabricantes);
  const distribuidores = useSelector((state) => state.distribuidores);

  const [division, setDivision] = useState(null);
  const [seccion, setSeccion] = useState(null);

  useEffect(() => {
    dispatch(getAllMaster());
    dispatch(getFabricantes());
    dispatch(getDistribuidores());
  }, [dispatch]);

  const [form, setForm] = useState({
    masterformat: "",
    nombre: "",
    descripcion: "",
    fabricante_id: "",
    distribuidor_id: "",
    transmitancia: "",
    resistencia: "",
    factor_solar: "",
    energia: "",
    gas: "",
    agua: "",
    estrellas: "",
    img: "",
  });

  console.log(form);

  return (
    <Modal open={open} onClose={onClose} size={"lg"}>
      <Container>
        <Header>
          <h2>CREAR NUEVO PRODUCTO</h2>
        </Header>
        <Divider />
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid lightgray",
            paddingTop: "10px",
            paddingLeft: "20px",
          }}
        >
          <FlexboxGrid justify="space-around">
            <FlexboxGrid.Item colspan={24}>
              <h4>SELECCIÓN DE IMAGEN DE PRODUCTO</h4>
              <Uploader
                accept="image/*"
                listType="picture-text"
                multiple={false}
                style={{
                  backgroundColor: "lightgray",
                  display: "flex",
                  flexDirection: "row",
                  padding: "10px",
                  justifyContent: "space-between",
                }}
              >
                <Button>Seleccionar archivo</Button>
              </Uploader>
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <Divider style={{ width: "95%" }} />

          <FlexboxGrid justify="space-around">
            <FlexboxGrid.Item colspan={24}>
              <h4>SELECCIÓN MASTERFORMAT</h4>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={7}>
              <SelectPicker
                data={master}
                style={{ width: "100%" }}
                placeholder="División MasterFormat"
                searchable={false}
                onChange={(value) => setDivision(value)}
              />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={7}>
              <SelectPicker
                data={
                  division
                    ? master.find((item) => item.value === division)?.children
                    : []
                }
                value={seccion}
                style={{ width: "100%" }}
                placeholder="Sección MasterFormat"
                searchable={false}
                onChange={(value) => setSeccion(value)}
              />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={7}>
              <SelectPicker
                data={
                  division && seccion
                    ? master
                        .find((item) => item.value === division)
                        ?.children.find((item) => item.value === seccion)
                        ?.children
                    : []
                }
                style={{ width: "100%" }}
                placeholder="Subdivisión MasterFormat"
                searchable={false}
                onChange={(value) => setForm({ ...form, masterformat: value })}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <Divider style={{ width: "95%" }} />

          <FlexboxGrid>
            <FlexboxGrid.Item colspan={24}>
              <h4>INFORMACIÓN GENERAL</h4>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={22}>
              <Input
                placeholder="Nombre del Producto"
                onChange={(value) => setForm({ ...form, nombre: value })}
                value={form.nombre}
              />
              <br></br>
              <Input
                placeholder="Descripción del Producto"
                as={"textarea"}
                onChange={(value) => setForm({ ...form, descripcion: value })}
                value={form.descripcion}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <Divider style={{ width: "95%" }} />

          <FlexboxGrid>
            <FlexboxGrid.Item colspan={8}>
              <h4>SELECCIÓN FABRICANTE</h4>
              <SelectPicker
                data={fabricantes.map((item) => ({
                  label: item.nombre,
                  value: item.id,
                }))}
                style={{ width: "100%" }}
                placeholder="Fabricante"
                searchable={false}
                onChange={(value) => setForm({ ...form, fabricante_id: value })}
                value={form.fabricante_id}
              />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={16} align="middle">
              <img
                src={
                  fabricantes.find((item) => item.id === form.fabricante_id)
                    ?.logo ||
                  "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png"
                }
                alt="fabricante"
                style={{ width: "20em" }}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <Divider style={{ width: "95%" }} />

          <FlexboxGrid>
            <FlexboxGrid.Item colspan={8}>
              <h4>SELECCIÓN DISTRIBUIDOR</h4>
              <SelectPicker
                data={distribuidores.map((item) => ({
                  label: item.nombre,
                  value: item.id,
                }))}
                style={{ width: "100%" }}
                placeholder="Distribuidor"
                searchable={false}
                onChange={(value) =>
                  setForm({ ...form, distribuidor_id: value })
                }
                value={form.distribuidor_id}
              />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={16} align="middle">
              <img
                src={
                  distribuidores.find(
                    (item) => item.id === form.distribuidor_id
                  )?.logo ||
                  "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png"
                }
                alt="fabricante"
                style={{ width: "20em" }}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <Divider style={{ width: "95%" }} />

          <FlexboxGrid>
            <FlexboxGrid.Item colspan={24}>
              <h4>SECCIÓN CALIFICACIONES</h4>
            </FlexboxGrid.Item>
            <br />
            <br />
            <br />
            <FlexboxGrid.Item colspan={24}>
              <Rate
                defaultValue={0}
                max={3}
                onChange={(value) => setForm({ ...form, estrellas: value })}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <Divider style={{ width: "95%" }} />
          <FlexboxGrid>
            <FlexboxGrid.Item colspan={24}>
              <Button
                appearance="primary"
                onClick={() => {
                  if (
                    form.masterformat === "" ||
                    form.nombre === "" ||
                    form.descripcion === "" ||
                    form.estrellas === ""
                  ) {
                    Swal.fire({
                      icon: "error",
                      title: "Faltan rellenar campos",
                      text: "Los campos MasterFormat, Nombre, Descripción y Estrellas son obligatorios",
                    });
                  } else {
                    axios
                      .post(
                        "https://greenhomes.com.ar/green-back/createProducto.php",
                        form
                      )
                      .then((res) => {
                        console.log(res);
                        Swal.fire({
                          icon: "success",
                          title: "Producto creado con éxito",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        onClose();
                        dispatch(getProductos());
                      });
                  }
                }}
              >
                CREAR PRODUCTO
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <br />
        </Content>
      </Container>
    </Modal>
  );
};

export default ProdCreateModal;
