import { Link, Route, Routes } from "react-router-dom";
import {
  Button,
  Container,
  Content,
  Header,
  Loader,
  Nav,
  Navbar,
} from "rsuite";
import { useNavigate } from "react-router-dom";
import Certificaciones from "./views/Certificaciones/Certificaciones";
import MasterFormat from "./views/MasterFormat/MasterFormat";
import Fabricantes from "./views/Fabricantes/Fabricantes";
import Productos from "./views/Productos/Productos";
import Home from "./views/Home/Home";
import { useSelector } from "react-redux";
import useAuth from "./hooks/useAuth";
import Distribuidores from "./views/Distribuidores/Distribuidores";
import Login from "./views/Login/Login";
import useError from "./hooks/useError";
import OffRoundIcon from "@rsuite/icons/OffRound";
import Archivos from "./views/Archivos/Archivos";
import Usuarios from "./views/Usuarios/Usuarios";
import Swal from "sweetalert2";

function App() {
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.isLoading);
  const { checkLogin, isLogged, logout } = useAuth();

  checkLogin();
  useError();

  const onSelect = (ek) => {
    navigate(ek);
  };

  return (
    <>
      {isLoading && (
        <Loader
          backdrop
          content="Cargando..."
          vertical
          size="lg"
          style={{ zIndex: 9999, width: "100vw", height: "100vh" }}
        />
      )}
      {
        <Container
          style={{
            height: "100%",
            backgroundColor: "#F5F5F5",
            minHeight: "100vh",
          }}
        >
          <Header>
            {isLogged && (
              <Navbar
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#C1D587",
                  color: "black",
                }}
              >
                <Link to="/">
                  <img
                    src="https://www.greenhomes.com.ar/img/AGBC_blanco.png"
                    alt="logo"
                    style={{
                      width: "5em",
                      objectFit: "cover",
                      backgroundColor: "#C1D587",
                    }}
                  />
                </Link>

                <Nav onSelect={onSelect}>
                  {[
                    { label: "Fabricantes", eventKey: "/fabricantes" },
                    { label: "Distribuidores", eventKey: "/distribuidores" },
                    { label: "Certificaciones", eventKey: "/certificaciones" },
                    { label: "Productos", eventKey: "/productos" },
                    { label: "MasterFormat", eventKey: "/master" },
                    { label: "Archivos", eventKey: "/archivos" },
                    { label: "Usuarios", eventKey: "/usuarios" },
                  ].map((item) => (
                    <Nav.Item key={item.eventKey} eventKey={item.eventKey}>
                      {item.label}
                    </Nav.Item>
                  ))}
                  <Nav.Item>
                    <Button
                      onClick={() => {
                        Swal.fire({
                          title: "¿Estás seguro?",
                          text: "¿Quieres cerrar sesión?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Sí",
                          cancelButtonText: "No",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            logout();
                          }
                        });
                      }}
                    >
                      <OffRoundIcon style={{ fontSize: "2em" }} size="lg" />
                    </Button>
                  </Nav.Item>
                </Nav>
              </Navbar>
            )}
          </Header>
          <Content
            style={{
              width: "70%",
              margin: "0 auto",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/certificaciones/*" element={<Certificaciones />} />
              <Route path="/distribuidores" element={<Distribuidores />} />
              <Route path="/master" element={<MasterFormat />} />
              <Route path="/fabricantes" element={<Fabricantes />} />
              <Route path="/productos/" element={<Productos />} />
              <Route path="/archivos/" element={<Archivos />} />
              <Route path="/login" element={<Login />} />
              <Route path="/usuarios/*" element={<Usuarios />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </Content>
        </Container>
      }
    </>
  );
}

export default App;
