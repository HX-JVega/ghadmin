import { useState } from "react";
import { Button, ButtonGroup, FlexboxGrid, Input, List } from "rsuite";
import Swal from "sweetalert2";

const EditRow = ({ row }) => {
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleEdit = () => {
    toggleEdit();
    Swal.fire({
      icon: "success",
      title: "Editado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <List.Item>
      <FlexboxGrid
        style={{
          alignItems: "center",
        }}
      >
        <FlexboxGrid.Item colspan={6}>
          <b>{row.label}</b>
        </FlexboxGrid.Item>

        {/* ---------------------------------- DATA -------------------------------------- */}
        {edit ? (
          <FlexboxGrid.Item colspan={12}>
            <Input
              defaultValue={row.value}
              rows={5}
              as={
                [
                  "proposito",
                  "requerimiento",
                  "productos_aplicables",
                  "rendimiento_ejemplos",
                  "estandares",
                ].includes(row.key)
                  ? "textarea"
                  : "input"
              }
            />
          </FlexboxGrid.Item>
        ) : (
          <FlexboxGrid.Item colspan={12}>{row.value}</FlexboxGrid.Item>
        )}
        {/* ---------------------------------- DATA -------------------------------------- */}

        {/* ---------------------------------- BUTTONS -------------------------------------- */}

        <FlexboxGrid.Item
          colspan={6}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {edit ? (
            <ButtonGroup>
              <Button onClick={toggleEdit} appearance="primary" color="red">
                Cancelar
              </Button>
              <Button appearance="primary" color="green" onClick={handleEdit}>
                Confirmar
              </Button>
            </ButtonGroup>
          ) : (
            <Button appearance="primary" onClick={toggleEdit}>
              Editar
            </Button>
          )}
        </FlexboxGrid.Item>

        {/* ---------------------------------- BUTTONS -------------------------------------- */}
      </FlexboxGrid>
    </List.Item>
  );
};

export default EditRow;
