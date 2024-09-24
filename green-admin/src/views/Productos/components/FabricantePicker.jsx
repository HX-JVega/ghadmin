import { Form, Message, Panel, SelectPicker } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFabricantes } from "../../../redux/actions";
import { Link } from "react-router-dom";

const FabricantePicker = ({ onChange }) => {
  const dispatch = useDispatch();
  const fabricantes = useSelector((state) => state.fabricantes);

  useEffect(() => {
    dispatch(getFabricantes());
  }, [dispatch]);

  return (
    <Panel header={<b>Información de Fabricante </b>} bordered>
      <Message type="info">
        Selecciona el fabricante del producto que deseas crear. Si el fabricante
        que deseas seleccionar aún no existe en la Base de Datos puedes ir al{" "}
        <Link>
          <b>FORMULARIO DE CREACIÓN DE FABRICANTE</b>
        </Link>
      </Message>
      <br />
      <SelectPicker
        data={fabricantes.map((item) => ({
          label: item.nombre,
          value: item.id,
        }))}
        placeholder="Selecciona un fabricante"
        style={{ width: "100%" }}
        onChange={(value) => onChange(value)}
      />
    </Panel>
  );
};

export default FabricantePicker;
