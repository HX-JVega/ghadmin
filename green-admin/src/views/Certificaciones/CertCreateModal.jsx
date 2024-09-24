import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Header,
  Input,
  Modal,
  Panel,
  SelectPicker,
  Uploader,
} from "rsuite";
import useError from "../../hooks/useError";
import { createCertificacion, createDistribuidor } from "../../redux/actions";

const CertCreateModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { setError } = useError();

  const categoriasCertificaciones = useSelector(
    (state) => state.categoriasCertificaciones
  );

  const initialForm = {
    codigo: "",
    nombre: "",
    categoria_id: "",
    puntos: "",
    version: "",
    proposito: "",
    requerimiento: "",
    productos_aplicables: "",
    rendimiento_ejemplar: "",
    documentacion: "",
    estandares: "",
    logo: "",
  };

  const [form, setForm] = useState(initialForm);

  const handleFormChange = (value, e) => {
    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const handleSubmit = () => {
    if (
      form.codigo === "" ||
      form.nombre === "" ||
      form.categoria_id === "" ||
      form.puntos === "" ||
      form.version === ""
    ) {
      setError("Los campos obligatorios no pueden estar vacíos");
      return;
    }
    dispatch(createCertificacion(form));
  };

  return (
    <Modal open={open} onClose={onClose} size={"md"}>
      <Container>
        <Header>
          <h3>CREAR CERTIFICACION</h3>
        </Header>
        <Divider />
        <Content>
          <FlexboxGrid>
            <FlexboxGrid.Item colspan={24}>
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
                    folder: "certificaciones",
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
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider />
          <FlexboxGrid>
            <FlexboxGrid.Item
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5em",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              colspan={24}
            >
              <label>
                <b>Código de Certificación *</b>
              </label>
              <Input
                style={{
                  width: "50%",
                }}
                name="codigo"
                onChange={handleFormChange}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <br />
          <FlexboxGrid>
            <FlexboxGrid.Item
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5em",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              colspan={24}
            >
              <label>
                <b>Nombre de Certificación *</b>
              </label>
              <Input
                name="nombre"
                style={{
                  width: "50%",
                }}
                onChange={handleFormChange}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider />
          <FlexboxGrid>
            <FlexboxGrid.Item
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5em",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              colspan={24}
            >
              <label>
                <b>Categoría de Certificación *</b>
              </label>
              <SelectPicker
                data={categoriasCertificaciones.map((categoria) => {
                  return {
                    label: categoria.nombre,
                    value: categoria.id,
                  };
                })}
                style={{
                  width: "50%",
                }}
                name="categoria_id"
                searchable={false}
                placeholder="Seleccione una categoría"
                onChange={(value) =>
                  handleFormChange(value, { target: { name: "categoria_id" } })
                }
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider />
          <FlexboxGrid>
            <FlexboxGrid.Item
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5em",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              colspan={24}
            >
              <label>
                <b>Puntos Posibles *</b>
              </label>
              <Input
                style={{ width: "50%" }}
                type="number"
                name="puntos"
                onChange={handleFormChange}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider />
          <FlexboxGrid>
            <FlexboxGrid.Item
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5em",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              colspan={24}
            >
              <label>
                <b>Versión *</b>
              </label>
              <SelectPicker
                style={{ width: "50%" }}
                searchable={false}
                data={[
                  {
                    label: "Green Homes 1.0",
                    value: "Green Homes 1.0",
                  },
                ]}
                name="version"
                onChange={(value) =>
                  handleFormChange(value, { target: { name: "version" } })
                }
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider />
          <FlexboxGrid>
            <FlexboxGrid.Item
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5em",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              colspan={24}
            >
              <label>
                <b>Propósito</b>
              </label>
              <Input
                as={"textarea"}
                rows={4}
                style={{ width: "50%", fontSize: "0.9em" }}
                name="proposito"
                onChange={handleFormChange}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider />
          <FlexboxGrid>
            <FlexboxGrid.Item
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5em",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              colspan={24}
            >
              <label>
                <b>Requerimiento</b>
              </label>
              <Input
                as={"textarea"}
                rows={4}
                style={{ width: "50%", fontSize: "0.9em" }}
                name="requerimiento"
                onChange={handleFormChange}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider />
          <FlexboxGrid>
            <FlexboxGrid.Item
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5em",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              colspan={24}
            >
              <label>
                <b>Productos Aplicables</b>
              </label>
              <Input
                as={"textarea"}
                rows={3}
                style={{ width: "50%", fontSize: "0.9em" }}
                name="productos_aplicables"
                onChange={handleFormChange}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider />
          <FlexboxGrid>
            <FlexboxGrid.Item
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5em",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              colspan={24}
            >
              <label>
                <b>Rendimiento Ejemplar</b>
              </label>
              <Input
                as={"textarea"}
                rows={2}
                style={{ width: "50%", fontSize: "0.9em" }}
                name="rendimiento_ejemplar"
                onChange={handleFormChange}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <Divider />
          <FlexboxGrid>
            <FlexboxGrid.Item
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5em",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              colspan={24}
            >
              <label>
                <b>Documentación</b>
              </label>
              <Input
                as={"textarea"}
                rows={2}
                style={{ width: "50%", fontSize: "0.9em" }}
                name="documentacion"
                onChange={handleFormChange}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider />
          <FlexboxGrid>
            <FlexboxGrid.Item
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5em",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              colspan={24}
            >
              <label>
                <b>Estándares</b>
              </label>
              <Input
                as={"textarea"}
                rows={2}
                style={{ width: "50%", fontSize: "0.9em" }}
                name="estandares"
                onChange={handleFormChange}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider />
          <FlexboxGrid>
            <FlexboxGrid.Item
              colspan={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  width: "50%",
                }}
                onClick={handleSubmit}
              >
                CREAR CERTIFICACION
              </Button>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              colspan={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  width: "50%",
                }}
                onClick={() => {
                  setForm(initialForm);
                  onClose();
                }}
                color="red"
              >
                CANCELAR
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </Modal>
  );
};

export default CertCreateModal;
