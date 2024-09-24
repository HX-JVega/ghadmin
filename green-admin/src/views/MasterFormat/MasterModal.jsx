import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Input,
  InputGroup,
  Message,
  Modal,
  SelectPicker,
} from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { getAllMaster } from "../../redux/actions";

const AddDivision = ({ divisiones }) => {
  const dispatch = useDispatch();
  const [division, setDivision] = useState({
    id: "",
    nombre_division: "",
  });

  const validateId = () => {
    if (!division.id) return false;
    if (divisiones.find((item) => item.value == division.id)) return false;
    if (!/^\d{2}$/g.test(division.id)) return false;
    return true;
  };

  const onSubmit = () => {
    if (!validateId()) {
      Swal.fire({
        icon: "error",
        title: "Error al intentar agregar la División",
        html: "El código de División es inválido o ya existe",
      });
    } else {
      axios
        .post(
          "https://greenhomes.com.ar/green-back/createDivision.php",
          division
        )
        .then((res) => {
          if (res.status == 200) {
            dispatch(getAllMaster());
            Swal.fire({
              icon: "success",
              title: "División agregada correctamente",
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Error al intentar agregar la División",
            html: err,
          });
        });
    }
  };

  return (
    <Content>
      <Input
        placeholder="Código de División"
        value={division.id}
        onChange={(value) => setDivision({ ...division, id: value })}
      />
      <br />
      <Input
        placeholder="Nombre de División"
        value={division.nombre}
        onChange={(value) =>
          setDivision({ ...division, nombre_division: value })
        }
      />
      <br />
      <Button appearance="primary" style={{ width: "100%" }} onClick={onSubmit}>
        Agregar
      </Button>
      <Divider />
      <h3>Divisiones Existentes</h3>
      <FlexboxGrid>
        {divisiones.map((item) => (
          <FlexboxGridItem colspan={12} key={item.value}>
            <h6>{item.label}</h6>
          </FlexboxGridItem>
        ))}
      </FlexboxGrid>
    </Content>
  );
};

const AddSeccion = ({ divisiones }) => {
  const dispatch = useDispatch();
  const [seccion, setSeccion] = useState({
    id: "",
    nombre_seccion: "",
    division_id: "",
  });

  const validateSeccion = () => {
    if (!seccion.division_id) return false;
    if (!seccion.id) return false;
    if (
      divisiones
        .find((item) => item.value == seccion.division_id)
        ?.children.find(
          (item) => item.value == `${seccion.division_id}${seccion.id}`
        )
    )
      return false;
    if (!/^\d{2}$/g.test(seccion.id)) return false;

    return true;
  };

  const onSubmit = () => {
    if (!validateSeccion()) {
      Swal.fire({
        icon: "error",
        title: "Error al intentar agregar la Sección",
        html: "El código de Sección es inválido o ya existe",
      });
    } else {
      axios
        .post("https://greenhomes.com.ar/green-back/createSeccion.php", seccion)
        .then((res) => {
          if (res.status == 200) {
            dispatch(getAllMaster());
            Swal.fire({
              icon: "success",
              title: "Sección agregada correctamente",
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Error al intentar agregar la Sección",
            html: err.message,
          });
        });
    }
  };

  return (
    <Content>
      <SelectPicker
        placeholder="División"
        data={divisiones}
        onChange={(value) =>
          setSeccion({ ...seccion, division_id: value || "" })
        }
        style={{ width: "100%" }}
      />
      <br />
      <br />

      <InputGroup>
        <Input
          value={seccion.division_id}
          disabled
          style={{
            color: "#000",
            width: "5em",
          }}
        />
        <Input
          value={seccion.id}
          placeholder="Código de Sección"
          onChange={(value) => setSeccion({ ...seccion, id: value })}
        />
      </InputGroup>
      <br />
      <Input
        placeholder="Nombre de Sección"
        value={seccion.nombre}
        onChange={(value) => setSeccion({ ...seccion, nombre_seccion: value })}
      />
      <br />
      <Button appearance="primary" style={{ width: "100%" }} onClick={onSubmit}>
        Agregar
      </Button>
      <Divider />
      {seccion.division_id && (
        <>
          <h4>
            Secciones Existentes en la División{" "}
            {
              divisiones.find((item) => item.value == seccion.division_id)
                ?.label
            }
          </h4>
          <br />
          <FlexboxGrid>
            {divisiones
              .find((item) => item.value == seccion.division_id)
              ?.children.map((item) => (
                <FlexboxGridItem colspan={12} key={item.value}>
                  <h6>{item.label}</h6>
                </FlexboxGridItem>
              ))}
          </FlexboxGrid>
        </>
      )}
    </Content>
  );
};

const AddSubdivision = ({ divisiones }) => {
  const dispatch = useDispatch();
  const [temp, setTemp] = useState({
    division_id: "",
    seccion_id: "",
  });

  const [subdivision, setSubdivision] = useState({
    id: "",
    nombre_subdivision: "",
    seccion_id: "",
  });

  const validateSubdivision = () => {
    if (!subdivision.seccion_id) return false;
    if (!subdivision.id) return false;
    if (
      divisiones
        .find((item) => item.value == temp.division_id)
        ?.children.find((item) => item.value == temp.seccion_id)
        ?.children.find(
          (item) => item.value == `${subdivision.seccion_id}${subdivision.id}`
        )
    )
      return false;
    if (!/^\d{2}$/g.test(subdivision.id)) return false;
    if (!subdivision.nombre_subdivision) return false;
    return true;
  };

  const onSubmit = () => {
    if (!validateSubdivision()) {
      Swal.fire({
        icon: "error",
        title: "Error al intentar agregar la Subdivisión",
        html: "Los datos ingresados son inválidos o ya existen. Por favor, verifique.",
      });
    } else {
      axios
        .post(
          "https://greenhomes.com.ar/green-back/createSubdivision.php",
          subdivision
        )
        .then((res) => {
          if (!res.error) {
            Swal.fire({
              icon: "success",
              title: "Subdivisión agregada correctamente",
            });
          }
          dispatch(getAllMaster());
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Error al intentar agregar la Subdivisión",
            html: err,
          });
        });
    }
  };

  return (
    <Content>
      <SelectPicker
        searchable={false}
        placeholder="División"
        data={divisiones}
        onChange={(value) => setTemp({ ...temp, division_id: value || "" })}
        style={{ width: "100%" }}
      />
      <br />
      <br />
      <SelectPicker
        style={{ width: "100%" }}
        searchable={false}
        placeholder="Sección"
        data={
          divisiones.find((item) => item.value == temp.division_id)?.children ||
          []
        }
        onChange={(value) =>
          setSubdivision({ ...subdivision, seccion_id: value || "" })
        }
      />
      <br />
      <br />
      <InputGroup>
        <Input
          disabled
          value={subdivision.seccion_id}
          style={{
            color: "#000",
            width: "5em",
          }}
        />
        <Input
          value={subdivision.id}
          placeholder="Código de Subdivisión"
          onChange={(value) => setSubdivision({ ...subdivision, id: value })}
        />
      </InputGroup>
      <br />
      <Input
        placeholder="Nombre de Subdivisión"
        value={subdivision.nombre_subdivision}
        onChange={(value) =>
          setSubdivision({ ...subdivision, nombre_subdivision: value })
        }
      />

      <br />
      <Button appearance="primary" style={{ width: "100%" }} onClick={onSubmit}>
        Agregar
      </Button>
      <Divider />
      {subdivision.seccion_id && (
        <>
          <h4>
            Subdivisiones Existentes en la Sección{" "}
            {
              divisiones
                .find((item) => item.value == temp.division_id)
                ?.children.find((item) => item.value == subdivision.seccion_id)
                ?.label
            }
          </h4>
          <br />
          <FlexboxGrid>
            {divisiones
              .find((item) => item.value == temp.division_id)
              ?.children.find((item) => item.value == subdivision.seccion_id)
              ?.children.map((item) => (
                <FlexboxGridItem colspan={12} key={item.value}>
                  <h6>{item.label}</h6>
                </FlexboxGridItem>
              ))}
          </FlexboxGrid>
        </>
      )}
    </Content>
  );
};

const MasterModal = ({ open, onClose }) => {
  const master = useSelector((state) => state.master);
  const [toAdd, setToAdd] = useState("default");
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>
          Agregar Especificaciones MasterFormat
          <br />
          <p>
            Seleccione si quiere agregar una <b>División</b>, <b>Sección</b> o{" "}
            <b>Subdivisión</b>
          </p>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ButtonGroup>
              <Button appearance="primary" onClick={() => setToAdd("division")}>
                División
              </Button>
              <Button appearance="primary" onClick={() => setToAdd("seccion")}>
                Sección
              </Button>
              <Button
                appearance="primary"
                onClick={() => setToAdd("subdivision")}
              >
                Subdivisión
              </Button>
            </ButtonGroup>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {
            {
              division: <AddDivision divisiones={master} />,
              seccion: <AddSeccion divisiones={master} />,
              subdivision: <AddSubdivision divisiones={master} />,
              default: <Message>Seleccione una de las opciones</Message>,
            }[toAdd]
          }
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default MasterModal;
