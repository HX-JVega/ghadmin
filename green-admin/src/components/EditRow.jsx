import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, FlexboxGrid, Input, List } from "rsuite";
import { updateRegister } from "../redux/actions";

const EditRow = ({
  label,
  value,
  readOnly,
  entity,
  property,
  id,
  action,
  isCert,
}) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const onChange = (value) => {
    setNewValue(value);
  };

  const handleSave = () => {
    dispatch(
      updateRegister({ entity, id, value: newValue, property, action, isCert })
    );
    setEdit(false);
  };

  return (
    <List.Item>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={4}>
          <b>{label}</b>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={16}>
          {edit ? (
            <Input type="text" value={newValue} onChange={onChange} />
          ) : (
            <p>{newValue ? newValue : "No hay datos"}</p>
          )}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          colspan={4}
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {edit ? (
            <>
              <Button
                onClick={handleSave}
                appearance="primary"
                color="green"
                disabled={newValue === value}
              >
                {" "}
                Guardar
              </Button>

              <Button
                onClick={() => {
                  setEdit(false);
                  setNewValue(value);
                }}
                appearance="primary"
                color="red"
              >
                Cancelar
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setEdit(true)}
              appearance="primary"
              color="yellow"
              disabled={readOnly}
            >
              Editar
            </Button>
          )}
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </List.Item>
  );
};

export default EditRow;
