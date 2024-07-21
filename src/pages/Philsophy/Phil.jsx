import React, { useEffect, useRef, useState } from "react";
import "./Phil.css";
import "aos/dist/aos.css";
import AOS from "aos";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import NavM from "../../components/NavMove/NavM";
import Nav from "../../components/NavbarScroll/Nav";
import philImg from "../../assets/img/Ellipse 36@1x.png";
import vector1 from "../../assets/img/Vector@1x (1).png";
import vector2 from "../../assets/img/Vector@1x.png";
import message from "../../assets/img/Message@1x.png";
import Footer from "../../components/Footer/Footer";
import { useTranslation } from "react-i18next";
import pract from "../../../phils.json";
import Lottie from "lottie-react";
import land from "../../assets/img/phiLand.png";
import { useDispatch } from "react-redux";
import { typeApi } from "../../Api/slice/ApiGet";
import Top from "../../components/Top/Top";
function Phil() {
  const [active, setActive] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
    });
  }, []);
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      const elements = document.querySelectorAll("[data-aos]");
      if (window.innerWidth <= 768) {
        elements.forEach((element) => {
          element.removeAttribute("data-aos");
        });
      } else {
        elements.forEach((element) => {
          const dataAosValue = element.getAttribute("data-aos-original");
          if (dataAosValue) {
            element.setAttribute("data-aos", dataAosValue);
          }
        });
      }
    };

    const saveOriginalDataAos = () => {
      const elements = document.querySelectorAll("[data-aos]");
      elements.forEach((element) => {
        const dataAosValue = element.getAttribute("data-aos");
        element.setAttribute("data-aos-original", dataAosValue);
      });
    };

    saveOriginalDataAos();
    window.addEventListener("resize", handleResize);
    handleResize(); // Run on initial load

    AOS.init();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const lang = sessionStorage.getItem("language") || "ar";
  const dispatch = useDispatch();
  const [phills, setPhills] = useState([]);
  useEffect(() => {
    let dataType = {
      lang,
      key: "philosophies",
    };
    dispatch(typeApi(dataType)).then((result) => {
      if (result?.payload?.status == 200) {
        setPhills(result?.payload?.data?.data);
        console.log(phills);
      }
    });
  }, [lang]);
  const bottomRef = useRef(null);

  // دالة التمرير إلى الجزء السفلي
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {active === false ? <NavM bottom={scrollToBottom} /> : null}
      {active === true ? (
        <Nav
          name={t("global.props.philosophy")}
          Class="header2"
          bottom={scrollToBottom}
        />
      ) : null}
      <Nav
        name={t("global.props.philosophy")}
        Class="header3"
        bottom={scrollToBottom}
      />
      {/* start Phil */}
      <div className="phil">
        <Container>
          <Row className="philso d-flex align-items-center" data-aos="zoom-in">
            <Col lg={8} md={12} sm={12}>
              <div className="phil-text">
                <div className="phil-title mb-3">
                  <span>{t("global.phil.title1")}</span>
                  <span>{t("global.phil.title2")}</span>
                </div>
                <p>{t("global.phil.description1")}</p>
                <p>{t("global.phil.description2")}</p>
              </div>
            </Col>
            <Col lg={4} md={12} sm={12}>
              <div className="phil-img position-relative">
                <img className="big" src={land} alt="" />
                <Lottie
                  className="loti"
                  animationData={pract}
                  style={{
                    position: "absolute",
                    bottom: "-17%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "150px",
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* end Phil */}
      {/* start section-phil */}
      <div className="section-phil mt-5 mb-5 ">
        <Container>
          <Row className="philoo d-flex  justify-content-center">
            {phills &&
              phills.map((ph) => (
                <>
                  <Col lg={4} md={4} sm={12}>
                    <div className="content-phil" data-aos="fade-down">
                      <div className="over">
                        <img className="small" src={ph?.image} alt="" />
                        <img src={ph?.icon} alt="" />
                      </div>
                      <span>{ph?.title}</span>
                      <span
                        dangerouslySetInnerHTML={{ __html: ph?.description }}
                      />
                    </div>
                  </Col>
                </>
              ))}
          </Row>
        </Container>
      </div>
      <Top />
      {/* end section-phil */}
      <div ref={bottomRef}>
        <Footer />
      </div>
    </>
  );
}

export default Phil;
