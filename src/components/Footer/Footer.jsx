import React, { useEffect, useMemo, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { LuPhone } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import logo from "../../assets/img/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOS from "aos";
import "./Footer.css"
import { useDispatch } from 'react-redux';
import { contactApi } from '../../Api/slice/ApiPost';
import { IoIosCloudDone } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import { MdError } from "react-icons/md";
import Done from '../Done/Done';

function Footer() {
    const { t } = useTranslation();

     useEffect(() => {
       AOS.init({
         duration: 1000, // Animation duration in milliseconds
       });
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
 
   const [activeLink, setActiveLink] = useState("inquiries");
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState(null);
  const [right, setRight] = useState(false);
  const dispatch = useDispatch();
  const [showDone, setShowDone] = useState(false);
  const [text, setText] = useState("");
  const handleDoneClose = () => setShowDone(false);
  const handleDoneModal = () => {
    setShowDone(true);
    setText(t("global.done.text1"));
  };
  const memoDone = useMemo(
    () => ({
      showDone,
      handleDoneClose,
      text,
    }),
    [showDone, handleDoneClose, text]
  );
  const validate = () => {
    const errors = {};

    if (name == null) {
      errors.name = "هذا الحقل مطلوب";
    }
    if (phone == null) {
      errors.phone = "هذا الحقل مطلوب";
    }
    if (email == null) {
      errors.email = "هذا الحقل مطلوب";
    }
    if (message == null) {
      errors.message = "هذا الحقل مطلوب";
    }
   

  
    setTimeout(() => {
      setErrors({});
    }, 3000);

    return errors;
  };
    const [errors, setErrors] = useState({});

   const handleLinkClick = (link) => {
     setActiveLink(link);
        console.log(activeLink);
  };
  const handleContact = async (e) => {
    e.preventDefault();
    let dataContact = {
      name,
      phone,
      email,
      message,
      type: activeLink,
    };
 const errContact = validate();
    if (Object.keys(errContact).length === 0) {
      try {
        await dispatch(contactApi(dataContact)).then((result) => {
          if (result.payload.status == 201) {
            setRight(true);
            handleDoneModal();
            setTimeout(() => {
              setRight(false);
            }, 3000);
          }
        });
      } catch (error) {
        //  // console.error(error);
      }
    } else {
      setErrors(errContact);
    }
 }
  return (
    <>
      {" "}
      <div className="success">
        <div className="overlay"></div>
        <Container>
          <Row className="conatct d-flex align-items-center ">
            <Col lg={6} md={12} sm={12} data-aos="fade-left">
              <div className="contact-data">
                <img src={logo} alt="" />
                <div>
                  <span>
                    <LuPhone className="icon" />
                  </span>
                  <span>00966567769125</span>
                </div>
                <div>
                  <span>
                    <CiMail className="icon" />
                  </span>
                  <span>hello@pointksa.net</span>
                </div>
              </div>
            </Col>
            <Col lg={6} md={12} sm={12} data-aos="fade-right">
              <div className="form">
                <div className="pad">
                  <span>{t("global.success.title")}</span>
                  <div className="linkat">
                    <span
                      className={activeLink === "inquiries" ? "active" : ""}
                      onClick={() => handleLinkClick("inquiries")}
                    >
                      {t("global.success.generalInquiries")}
                    </span>
                    <span
                      className={activeLink === "talents" ? "active" : ""}
                      onClick={() => handleLinkClick("talents")}
                    >
                      {t("global.success.talents")}
                    </span>
                    <span
                      className={activeLink === "works" ? "active" : ""}
                      onClick={() => handleLinkClick("works")}
                    >
                      {t("global.success.works")}
                    </span>
                  </div>
                  <form action="">
                    <input
                      type="text"
                      placeholder={t("global.success.fullNamePlaceholder")}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name ? (
                      <>
                        <p
                          style={{
                            width: "100%",
                            fontFamily: "IBM Plex Sans, sans-serif",

                            textAlign: "right",
                            color: "red",
                            fontSize: "18px",
                            fontWeight: "500",
                          }}
                        >
                          <MdError />

                          {t("global.validation.req")}
                        </p>
                      </>
                    ) : null}
                    <input
                      type="text"
                      placeholder={t("global.success.emailPlaceholder")}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email ? (
                      <>
                        <p
                          style={{
                            width: "100%",
                            fontFamily: "IBM Plex Sans, sans-serif",

                            textAlign: "right",
                            color: "red",
                            fontSize: "18px",
                            fontWeight: "500",
                          }}
                        >
                          <MdError />

                          {t("global.validation.req")}
                        </p>
                      </>
                    ) : null}
                    <input
                      type="text"
                      placeholder={t("global.success.phonePlaceholder")}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone ? (
                      <>
                        <p
                          style={{
                            width: "100%",
                            fontFamily: "IBM Plex Sans, sans-serif",

                            textAlign: "right",
                            color: "red",
                            fontSize: "18px",
                            fontWeight: "500",
                          }}
                        >
                          <MdError />

                          {t("global.validation.req")}
                        </p>
                      </>
                    ) : null}
                    <textarea
                      rows={10}
                      placeholder={t(
                        "global.success.optionalMessagePlaceholder"
                      )}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    {errors.message ? (
                      <>
                        <p
                          style={{
                            width: "100%",
                            fontFamily: "IBM Plex Sans, sans-serif",

                            textAlign: "right",
                            color: "red",
                            fontSize: "18px",
                            fontWeight: "500",
                          }}
                        >
                          <MdError />
                          {t("global.validation.req")}
                        </p>
                      </>
                    ) : null}
                    {right === true && (
                      <span
                        className="text-center d-flex gap-2 align-items-center justify-content-center"
                        style={{ color: "green", fontSize: "22px" }}
                      >
                        <IoIosCloudDone />
                        {t("global.success.successMessage")}
                      </span>
                    )}
                    <button className="send" onClick={handleContact}>
                      {t("global.success.sendButton")}
                    </button>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Done memoDone={memoDone} />
    </>
  );
}

export default Footer