import React, { useEffect, useState } from "react";

import {
  Button,
  Container,
  Divider,
  FlexboxGrid,
  Input,
  SelectPicker,
  Table,
} from "rsuite";

const { Column, HeaderCell, Cell } = Table;

const propsDict = {
  id: "ID",
  nombre: "Nombre",
  logo: "Logo",
  img: "Imagen",
  email: "Email",
  telefono: "Teléfono",
  num_productos: "Número de productos",
  descripcion: "Descripción",
  direccion: "Dirección",
  localidad: "Localidad",
  provincia: "Provincia",
  pais: "País",
  web: "Sitio web",
  nombre_categoria: "Categoría",
  tipo_cuenta: "Tipo de cuenta",
  estado: "Estado",
  verificado: "Email Verificado",
};

const GHTable = ({
  propsNames,
  detailModal,
  data,
  createModal,
  filterBy,
  bulkCreateModal,
  isLoaded,
}) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBulkCreateModal, setShowBulkCreateModal] = useState(false);
  const [toShow, setToShow] = useState(data);
  const [detailId, setDetailId] = useState(null);

  useEffect(() => {
    setToShow(data);
  }, [data]);

  const filter = (value) => {
    setToShow(
      data.filter((item) => {
        return item.nombre.toLowerCase().includes(value.toLowerCase());
      })
    );
  };

  return (
    <Container>
      {detailModal &&
        showDetailModal &&
        React.cloneElement(detailModal, {
          open: showDetailModal,
          onClose: () => setShowDetailModal(false),
          detailId,
          detail: data.find((item) => item.id === detailId),
          isLoaded,
        })}
      {createModal &&
        React.cloneElement(createModal, {
          open: showCreateModal,
          onClose: () => setShowCreateModal(false),
          isLoaded,
        })}
      {bulkCreateModal &&
        React.cloneElement(bulkCreateModal, {
          open: showBulkCreateModal,
          onClose: () => setShowBulkCreateModal(false),
        })}
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <Input
            placeholder="Buscar"
            onChange={(value) => {
              filter(value);
            }}
            style={{
              width: "100%",
              margin: "auto",
              border: "1px solid #000",
            }}
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          colspan={6}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {createModal && (
            <Button
              appearance="primary"
              color="green"
              style={{
                width: "50%",
                height: "100%",
              }}
              onClick={() => setShowCreateModal(true)}
            >
              <b>Creación Individual</b>
            </Button>
          )}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          colspan={6}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {bulkCreateModal && (
            <Button
              appearance="primary"
              color="green"
              style={{
                width: "50%",
                height: "100%",
              }}
              onClick={() => setShowBulkCreateModal(true)}
            >
              <b>Creación Múltiple</b>
            </Button>
          )}
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <br></br>
      {filterBy && (
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={12}>
            <SelectPicker
              data={filterBy[1].map((item) => {
                return { label: item, value: item };
              })}
              placeholder="Filtrar por"
              style={{
                width: "100%",
                margin: "auto",
                border: "1px solid #000",
              }}
              onChange={(value) => {
                value
                  ? setToShow(
                      data.filter((item) => {
                        return item[filterBy[0]] === value;
                      })
                    )
                  : setToShow(data);
              }}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      )}
      <Divider />
      <Table
        data={toShow}
        rowHeight={75}
        height={600}
        bordered
        style={{
          margin: "auto",
          minHeight: "100%",
          minWidth: "100%",
        }}
      >
        {propsNames.map((propName) => {
          return (
            <Column
              align="center"
              fixed
              key={propName}
              flexGrow={propName === "id" ? 1 : 3}
            >
              <HeaderCell>
                {propsDict[propName] ? propsDict[propName] : propName}
              </HeaderCell>
              {propName === "img" || propName === "logo" ? (
                <Cell>
                  {(rowData, rowIndex) => {
                    return (
                      <img
                        src={
                          rowData[propName] ||
                          "https://greenhomes.com.ar/uploads/logo-placeholder.png"
                        }
                        alt={rowData[propName]}
                        style={{
                          width: "4em",
                          height: "4em",
                          objectFit: "contain",
                        }}
                      />
                    );
                  }}
                </Cell>
              ) : (
                <Cell dataKey={propName} />
              )}
            </Column>
          );
        })}
        <Column width={120} align="center" fixed="right">
          <HeaderCell>Acciones</HeaderCell>
          <Cell>
            {(rowData, rowIndex) => (
              <Button
                appearance="primary"
                color="green"
                style={{
                  width: "50%",
                  height: "50%",
                }}
                onClick={() => {
                  setShowDetailModal(true);
                  setDetailId(rowData.id);
                }}
              >
                <b>Ver</b>
              </Button>
            )}
          </Cell>
        </Column>
      </Table>
    </Container>
  );
};

export default GHTable;
