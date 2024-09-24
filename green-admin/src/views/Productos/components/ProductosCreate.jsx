import {
  Button,
  Container,
  Content,
  Divider,
  Form,
  Input,
  Message,
  Panel,
} from "rsuite";
import MasterFormatPicker from "./MasterFormatPicker";
import { useState } from "react";
import FabricantePicker from "./FabricantePicker";
import TecnicosPicker from "./TecnicosPicker";
import Swal from "sweetalert2";
import axios from "axios";

const validate = (form) => {
  const errors = [];
  if (!form.masterformat) {
    errors.push("Debe seleccionar hasta una Subdivisión de MasterFormat");
  }
  if (!form.nombre) {
    errors.push("Debe ingresar un Nombre válido");
  }
  if (!form.descripcion) {
    errors.push("Debe ingresar una Descripción");
  }
  if (!form.fabricante_id) {
    errors.push("Debe seleccionar un Fabricante");
  }

  return errors;
};

const ProductosCreate = () => {
  const initialForm = {
    masterformat: "",
    nombre: "",
    descripcion: "",
    fabricante_id: "",
    //
    bim: "",
    cad: "",
    spec: "",
    //
    transmitancia: "",
    resistencia: "",
    factor_solar: "",
    energia: "",
    gas: "",
    agua: "",
    //
    estrellas: 0,
  };

  const [form, setForm] = useState(initialForm);

  const onSubmit = async () => {
    const errors = validate(form);
    if (errors.length) {
      Swal.fire({
        icon: "error",
        title: "Error al intentar crear el producto",
        html: errors.join("<br />"),
      });
    } else {
      const res = await axios.post(
        "https://greenhomes.com.ar/green-back/createProducto.php",
        form
      );
      if (res.data === "OK") {
        Swal.fire({
          icon: "success",
          title: "Producto creado correctamente",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al intentar crear el producto",
          html: res.data,
        });
      }
    }
  };

  return (
    <Container>
      <Content>
        <Panel bordered header={"Carga múltiple (En construcción)"}>
          <Message type="info">
            <p>
              En esta sección se podrá subir un archivo CSV con los productos a
              cargar en la Base de Datos. Recursos:
            </p>
            <ul>
              <li>
                <Button appearance="link">
                  Descarga de CSV Base para la carga de Productos
                </Button>
              </li>
              <li>
                <Button appearance="link">
                  Video Tutorial de Carga de Productos
                </Button>
              </li>
            </ul>
            <p>
              <b>
                Si deseas cargar un producto individualmente, puedes utilizar el
                formulario que se encuentra más abajo.
              </b>
            </p>
          </Message>
        </Panel>
        <Divider />
        <Panel bordered header="Carga Individual">
          <Form
            onSubmit={onSubmit}
            formValue={form}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              gap: "1em",
            }}
          >
            <MasterFormatPicker
              onChange={(value) => setForm({ ...form, masterformat: value })}
            />
            <Panel header={<b>Información Básica</b>} bordered>
              <Form.Group>
                <Form.ControlLabel>Nombre</Form.ControlLabel>
                <Input
                  name="nombre"
                  value={form.nombre}
                  onChange={(value) => setForm({ ...form, nombre: value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Descripción</Form.ControlLabel>
                <Input
                  name="descripcion"
                  as={"textarea"}
                  value={form.descripcion}
                  onChange={(value) => setForm({ ...form, descripcion: value })}
                />
              </Form.Group>
            </Panel>
            <FabricantePicker
              onChange={(value) => setForm({ ...form, fabricante_id: value })}
              value={form.fabricante_id}
            />
            <TecnicosPicker form={form} setForm={setForm} />

            <Button type="submit" appearance="primary" style={{ width: "8em" }}>
              Crear
            </Button>
            <Button
              type="reset"
              appearance="ghost"
              style={{ width: "8em" }}
              color="yellow"
              onClick={() => setForm(initialForm)}
            >
              Limpiar
            </Button>
          </Form>
        </Panel>
      </Content>
    </Container>
  );
};

export default ProductosCreate;
