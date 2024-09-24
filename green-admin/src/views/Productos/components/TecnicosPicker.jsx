import { Divider, FlexboxGrid, Form, InputNumber, Panel } from "rsuite";

const TecnicosPicker = ({ form, setForm }) => {
  return (
    <Panel header={<b>Datos Técnicos</b>} bordered>
      <FlexboxGrid
        justify="space-around"
        align="middle"
        style={{ gap: "1rem" }}
      >
        <FlexboxGrid.Item colspan={8}>
          <Form.Group>
            <Form.ControlLabel>Transmitancia - W/(m2.K)</Form.ControlLabel>
            <InputNumber
              name="transmitancia"
              value={form.transmitancia}
              onChange={(value) => setForm({ ...form, transmitancia: value })}
              defaultValue={0.0}
              step={0.01}
            />
          </Form.Group>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={8}>
          <Form.Group>
            <Form.ControlLabel>Resistencia - (m2.(K/W))</Form.ControlLabel>
            <InputNumber
              name="resistencia"
              value={form.resistencia}
              onChange={(value) => setForm({ ...form, resistencia: value })}
              defaultValue={0.0}
              step={0.01}
            />
          </Form.Group>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={8}>
          <Form.Group>
            <Form.ControlLabel>Factor Solar - (%)</Form.ControlLabel>
            <InputNumber
              name="factor_solar"
              value={form.factor_solar}
              onChange={(value) => setForm({ ...form, factor_solar: value })}
              defaultValue={0.0}
              step={0.01}
            />
          </Form.Group>
        </FlexboxGrid.Item>

        <FlexboxGrid.Item colspan={8}>
          <Form.Group>
            <Form.ControlLabel>Energía - (kW)</Form.ControlLabel>
            <InputNumber
              name="energia"
              value={form.energia}
              onChange={(value) => setForm({ ...form, energia: value })}
              defaultValue={0.0}
              step={0.01}
            />
          </Form.Group>
        </FlexboxGrid.Item>

        <FlexboxGrid.Item colspan={8}>
          <Form.Group>
            <Form.ControlLabel>Gas - (m3/h)</Form.ControlLabel>
            <InputNumber
              name="gas"
              value={form.gas}
              onChange={(value) => setForm({ ...form, gas: value })}
              defaultValue={0.0}
              step={0.01}
            />
          </Form.Group>
        </FlexboxGrid.Item>

        <FlexboxGrid.Item colspan={8}>
          <Form.Group>
            <Form.ControlLabel>Agua - (L/S)</Form.ControlLabel>
            <InputNumber
              name="agua"
              value={form.agua}
              onChange={(value) => setForm({ ...form, agua: value })}
              defaultValue={0.0}
              step={0.01}
            />
          </Form.Group>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  );
};

export default TecnicosPicker;
