import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlexboxGrid, Message, Panel, SelectPicker } from "rsuite";
import { getAllMaster } from "../../../redux/actions";
import { Link } from "react-router-dom";

const MasterFormatPicker = ({ value, onChange }) => {
  const dispatch = useDispatch();

  const master = useSelector((state) => state.master);

  useEffect(() => {
    dispatch(getAllMaster());
  }, [dispatch]);

  const [masterFormat, setMasterFormat] = useState({
    division: "",
    seccion: "",
    subdivision: "",
  });

  return (
    <Panel bordered header={<b>MasterFormat</b>}>
      <Message>
        <p>
          Selecciona la <b>División</b>, <b>Sección</b> y <b>Subdivisión</b>{" "}
          correspondiente al producto. Si no encuentras las categorías que
          buscas, puedes incluirla en la Base de Datos en la{" "}
          <Link>
            <b>SECCIÓN MASTERFORMAT</b>
          </Link>
        </p>
      </Message>
      <br />
      <FlexboxGrid
        align="middle"
        justify="space-around"
        style={{
          width: "75%",
          margin: "auto",
        }}
      >
        <FlexboxGrid.Item>
          <SelectPicker
            searchable={false}
            placeholder="División"
            data={master}
            onChange={(value) =>
              setMasterFormat({
                ...masterFormat,
                division: master.find((item) => item.value == value),
              })
            }
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <SelectPicker
            searchable={false}
            placeholder="Sección"
            data={masterFormat.division?.children || []}
            onChange={(value) =>
              setMasterFormat({
                ...masterFormat,
                seccion: masterFormat.division.children.find(
                  (item) => item.value == value
                ),
              })
            }
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <SelectPicker
            searchable={false}
            placeholder="Subdivisión"
            data={masterFormat.seccion?.children || []}
            onChange={(value) => {
              setMasterFormat({
                ...masterFormat,
                subdivision: masterFormat.seccion.children.find(
                  (item) => item.value == value
                ),
              });
              onChange(value);
            }}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  );
};

export default MasterFormatPicker;
