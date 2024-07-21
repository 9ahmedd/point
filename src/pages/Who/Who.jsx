import React, { useEffect, useRef, useState } from 'react'
import "aos/dist/aos.css";
import AOS from "aos";
import { Link, useLocation } from 'react-router-dom';
import NavM from '../../components/NavMove/NavM';
import Nav from '../../components/NavbarScroll/Nav';
import "./Who.css"
import logo from "../../assets/img/logoM.png"
import LOGO from "../../assets/img/logo.png"
import { Col, Container, Row } from 'react-bootstrap';
import icon1 from "../../assets/img/Icon@1x.png"
import icon2 from "../../assets/img/Icon@1x (1).png"
import whyImg from "../../assets/img/Phone@4x.png"
import Footer from '../../components/Footer/Footer';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { whoApi } from '../../Api/slice/ApiGet';
import Top from '../../components/Top/Top';
function Who() {
     const [active, setActive] = useState(false);
  const { t,i18n } = useTranslation();
   const [language, setLanguage] = useState(() => {
     // Retrieve the language from sessionStorage or default to "ar"
     return sessionStorage.getItem("language") || "ar";
   });

   const changeLanguage = (lang) => {
     setLanguage(lang);
     sessionStorage.setItem("language", lang);
   };

   useEffect(() => {
     // Update the HTML lang attribute and change the language in i18n whenever the language changes
     const currentLanguage = sessionStorage.getItem("language") || "ar";
     document.documentElement.lang = currentLanguage;
     i18n.changeLanguage(currentLanguage);
   }, [language]);

   const handleWorldIconClick = () => {
     // Toggle between 'en' and 'ar' languages
     const newLanguage = language === "en" ? "ar" : "en";
     changeLanguage(newLanguage);
   };

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

   const [colorChange, setColorChange] = useState(false);

   useEffect(() => {
     const interval = setTimeout(() => {
       setColorChange((prevColorChange) => !prevColorChange);
     }, 2000); // Total cycle duration: 2s for expansion + 5s green + 2s contraction
     return () => clearTimeout(interval);
   }, []);

  const lang = sessionStorage.getItem("language") || "ar";
  const dispatch = useDispatch();
  const [who, setWho] = useState([]);
  console.log(lang);
  useEffect(() => {
    dispatch(whoApi(lang)).then((result) => {
      if (result?.payload?.status == 200) {
        setWho(result?.payload?.data?.data)
        console.log(who)
      }
    })
  }, [lang])
  console.log(who);
  const bottomRef = useRef(null);

  // دالة التمرير إلى الجزء السفلي
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      {active === false ? (
        <div className={`header-who ${colorChange ? "w-header" : ""}`}>
          <div className="container">
            <div className="nav">
              <div className="links">
                <Link to="/servs">{t("global.nav.serv_link")}</Link>
                <Link to="/who">{t("global.nav.who")}</Link>
                <Link to="/phil">{t("global.nav.phil")}</Link>
                <Link to="">
                  <span onClick={scrollToBottom}>
                    {t("global.nav.success")}
                  </span>
                </Link>
                <Link to="/"> {t("global.nav.clients")}</Link>
                <Link to="/creations"> {t("global.nav.creations")}</Link>
                <Link to="/employment"> {t("global.nav.employment")}</Link>
                <Link to="#">
                  <span onClick={handleWorldIconClick}>
                    {" "}
                    {t("global.nav.english")}
                  </span>
                </Link>
              </div>
              <Link to="/">
                {" "}
                <img src={`${colorChange ? LOGO : logo}`} alt="" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      {active === true ? (
        <Nav
          name={t("global.props.who")}
          Class="header2"
          bottom={scrollToBottom}
        />
      ) : null}
      <Nav
        name={t("global.props.who")}
        Class="header3"
        bottom={scrollToBottom}
      />
      {/* Land-who */}
      <div className={`${colorChange ? "who-land" : "who-landing"}`}>
        <Container>
          <Row
            data-aos="zoom-in"
            className="whowo  d-flex align-items-center justify-content-center  "
          >
            <Col
              lg={8}
              md={6}
              sm={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="what-point">
                <span>{t("global.who.title")}</span>
                <span>{t("global.who.startPoint")}</span>

                <p dangerouslySetInnerHTML={{ __html: who.content }} />
              </div>
            </Col>
            <Col
              lg={4}
              md={6}
              sm={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="circle">
                <img src={logo} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Land-who */}
      {/* start section */}
      <div className="why-point mt-5 mb-5">
        <Container>
          <Row className="www d-flex align-items-center">
            <Col lg={8} md={12} sm={12}>
              <div className="why-desc " data-aos="zoom-in">
                <span className="whyy">{t("global.why.title")}</span>
                <div className="message">
                  <img src={icon1} alt="" />
                  <div>
                    <span>{t("global.why.messageTitle")}</span>
                    <span>{t("global.why.at")}</span>
                  </div>
                  <span
                    className="whyyy"
                    dangerouslySetInnerHTML={{ __html: who.mission }}
                  />
                </div>

                <div className="goal">
                  <img src={icon2} alt="" />
                  <div>
                    <span>{t("global.why.goalTitle")}</span>
                    <span>{t("global.why.at")}</span>
                  </div>
                  <span
                    className="whyyy"
                    dangerouslySetInnerHTML={{ __html: who.goal }}
                  />
                </div>
              </div>
            </Col>
            <Col lg={4} md={12} sm={12}>
              <div className="why-img" data-aos="zoom-in">
                <img src={whyImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* end section */}
      <Top />
      <div ref={bottomRef}>
        <Footer />
      </div>
    </>
  );
}

export default Who