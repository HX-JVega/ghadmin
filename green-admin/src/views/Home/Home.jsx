import { Container, Content, Message } from "rsuite";

const Home = () => {
  return (
    <Container>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          src="https://www.greenhomes.com.ar/img/AGBC_blanco.png"
          alt="logo"
          style={{
            width: "50%",
            borderRadius: "30%",
            backgroundColor: "grey",
            opacity: "0.5",
          }}
        />
      </Content>
    </Container>
  );
};

export default Home;
