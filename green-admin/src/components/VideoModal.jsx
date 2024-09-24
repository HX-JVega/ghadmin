import { useState } from "react";
import { Button, Container, Modal } from "rsuite";

const VideoModal = ({ video, text }) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };

  return (
    <Container>
      <Modal open={open} onClose={onClose} size={"lg"}>
        <video
          src={video}
          controls
          style={{
            width: "100%",
            height: "100%",
          }}
        ></video>
      </Modal>
      <Button appearance="ghost" onClick={onOpen} color="green">
        {text}
      </Button>
    </Container>
  );
};

export default VideoModal;
