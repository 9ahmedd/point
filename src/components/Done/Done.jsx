import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
// import Animation from "../../assets/img/done.gif";
import { useTranslation } from "react-i18next";
import "./Done.css"
import anim from "../../../success.json";
import Lottie from "lottie-react";
function Done(props) {
  const [done, setDone] = useState(false);
  const [text, setText] = useState("");
    const { t } = useTranslation();

  useEffect(() => {
    setDone(props.memoDone.showDone);
    setText(props.memoDone.text);
  }, [props.memoDone]);

  const doneClose = () => {
    props.memoDone.handleDoneClose();
    window.location.reload();
  };

  return (
    <>
      <Modal show={done} onHide={doneClose}>
        <Modal.Body
          style={{
            textAlign: "center",
            padding: "20px 50px 0",
          }}
        >
          <div>
            <Lottie
              animationData={anim}
              className="mx-auto"
              style={{
                //   position: "absolute",
                //   bottom: "-17%",
                //   left: "50%",
                //   transform: "translateX(-50%)",
                textAlign: "center",
                width: "150px",
              }}
            />
          </div>
          {/* <img src={Animation} alt="" /> */}
          <h3 style={{ color: "#333", fontWeight: "600", marginTop: "20px" }}>
            {text}
          </h3>
          <p
            style={{
              color: "#333",
              fontWeight: "500",
              padding: "20px 20px 0",
              marginBottom: "0",
            }}
          ></p>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none", padding: "20px 0 50px" }}>
          <Button
            variant="secondary mx-auto w-50"
            className="secondary mx-auto"
            onClick={doneClose}
            size="lg"
            style={{ backgroundColor: "#896F94", transition: "0.4s" }}
          >
            {t("global.done.close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Done;
