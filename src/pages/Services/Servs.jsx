import React, { useEffect, useRef, useState } from "react";
import logoM from "../../assets/img/logoM.png";
import "./Servs.css";
import "aos/dist/aos.css";
import AOS from "aos";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import Animation3 from "../../assets/img/Animation - 3.gif";
import { useLocation } from "react-router-dom";
import Nav from "../../components/NavbarScroll/Nav";
import logo from "../../assets/img/logo.png";
import { CgMenuRight } from "react-icons/cg";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoCloseSharp } from "react-icons/io5";
import one from "../../assets/img/Phone@1x.png";
import two from "../../assets/img/Phone@1x (1).png";
import graphic from "../../assets/img/Graphic Design@1x.png";
import event from "../../assets/img/Event@1x.png";
import NavM from "../../components/NavMove/NavM";
import Footer from "../../components/Footer/Footer";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { typeApi } from "../../Api/slice/ApiGet";
import Top from "../../components/Top/Top";

function Servs() {
  const [active, setActive] = useState(false);
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [servs, setServs] = useState([]);
  const dispatch = useDispatch();
  const lang = sessionStorage.getItem("language") || "ar";
  const [list, setList] = useState([]);
  const refs = useRef([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let dataType = {
      lang,
      key: "services",
    };
    dispatch(typeApi(dataType)).then((result) => {
      if (result?.payload?.status == 200) {
        setServs(result?.payload?.data?.data);
      }
    });
  }, [lang, dispatch]);

  useEffect(() => {
    const colors = [
      {
        id: 1,
        gradient: "linear-gradient(180deg, #8EC4FF -3%, #439DFF 100%)",
        isShowen: false,
      },
      {
        id: 2,
        gradient: "linear-gradient(180deg, #67DFCE -3%, #72B2A8 100%)",
        isShowen: false,
      },
      {
        id: 3,
        gradient: "linear-gradient(180deg, #F95C73 -3%, #D0273F 100%)",
        isShowen: false,
      },
      {
        id: 4,
        gradient: "linear-gradient(180deg, #A02DDD -3%, #561877 100%)",
        isShowen: false,
      },
    ];

    const mergedArray = servs.map((detail, index) => {
      const color = colors[index % colors.length];
      return { ...detail, gradient: color.gradient, isShowen: color.isShowen };
    });

    setList(mergedArray);
  }, [servs]);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute("data-index");
            const timer = setTimeout(() => {
              setList((prevList) =>
                prevList.map((item, i) =>
                  i === parseInt(index) ? { ...item, isShowen: true } : item
                )
              );
            }, 3000);
            observer.unobserve(entry.target);
            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.1 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [refs, list]);

  const { t } = useTranslation();
  const bottomRef = useRef(null);

  // دالة التمرير إلى الجزء السفلي
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {!active && <NavM bottom={scrollToBottom} />}
      {active && (
        <Nav
          name={t("global.props.services")}
          Class="header2"
          bottom={scrollToBottom}
        />
      )}
      <Nav
        name={t("global.props.services")}
        Class="header3"
        bottom={scrollToBottom}
      />

      {/* start landing */}
      <div className="landing-serv">
        <Container>
          <Row className="row-serv">
            <Col lg={8} md={8} sm={12}>
              <div className="text" data-aos="fade-left">
                <p>
                  {t("global.services.title2")}{" "}
                  <span> {t("global.services.in")}</span>
                </p>
                <p>{t("global.services.description")}</p>
              </div>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <div className="animation" data-aos="fade-right">
                <img className="anmi" src={Animation3} alt="" />
                <img src={logoM} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* end landing */}

      {/* start section */}
      <div className="section mt-5">
        <Container>
          {list.map((e, index) => (
            <React.Fragment key={e?.id}>
              <div
                className="all position-relative d-flex align-items-center gap-5"
                style={{
                  direction: "rtl",
                  width: "100%",
                  marginBottom: "150px",
                }}
              >
                <div
                  className="animated-text"
                  data-aos="zoom-in"
                  style={{
                    width: "50%",
                    display: e.isShowen ? "block" : "none",
                    transition: "0.5s ",
                  }}
                >
                  <div className="descc">
                    <div className="icon" style={{ background: e?.gradient }}>
                      <img src={e?.icon} alt="" />
                    </div>
                    <span className="titlee">{e?.title}</span>
                    <span
                      className="descp"
                      dangerouslySetInnerHTML={{ __html: e?.description }}
                    />
                  </div>
                </div>
                <img
                  src={e?.image}
                  alt=""
                  className={`animated-image ${
                    e.isShowen ? "shown " : "hidden "
                  }`}
                  data-aos={e.isShowen === false ? "zoom-in" : ""}
                  ref={(el) => (refs.current[index] = el)}
                  data-index={index}
                />
              </div>
            </React.Fragment>
          ))}
        </Container>
      </div>
      {/* End section */}
      <Top />
      <div ref={bottomRef}>
        <Footer />
      </div>
    </>
  );
}

export default Servs;
