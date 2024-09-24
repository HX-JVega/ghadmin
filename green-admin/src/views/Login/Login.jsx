import { Button, FlexboxGrid, Input, Modal } from "rsuite";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const { login, isLogged } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  return (
    <Modal open={!isLogged} size={"xs"}>
      <Modal.Header
        closeButton={false}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="https://www.greenhomes.com.ar/img/AGBC_blanco.png"
          alt="logo"
          style={{
            width: "15em",
            height: "15em",
            objectFit: "cover",
            backgroundColor: "#C1D587",
            borderRadius: "50%",
          }}
        />
      </Modal.Header>
      <Modal.Body>
        <FlexboxGrid
          justify="center"
          align="middle"
          style={{ height: "100%", gap: "0.5em" }}
        >
          <FlexboxGrid.Item colspan={24}>
            <Input
              placeholder="Usuario"
              onChange={(e) => setCredentials({ ...credentials, username: e })}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={24}>
            <Input
              placeholder="Contraseña"
              type="password"
              onChange={(e) => setCredentials({ ...credentials, password: e })}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={24}>
            <Button
              appearance="primary"
              style={{ width: "100%", backgroundColor: "#C1D587" }}
              onClick={() => login(credentials)}
            >
              <b>Ingresar</b>
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
