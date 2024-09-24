import { Container, Header, Modal } from "rsuite";

const CertBulkCreate = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Container>
        <Header>
          <h3>CARGA MASIVA DE CERTIFICACIONES</h3>
        </Header>
      </Container>
    </Modal>
  );
};

export default CertBulkCreate;
