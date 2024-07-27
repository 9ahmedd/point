import React, { useEffect, useMemo, useRef, useState } from 'react'
import "aos/dist/aos.css";
import './Employment.css'
import AOS from "aos";
import { useLocation } from 'react-router-dom';
import NavM from '../../components/NavMove/NavM';
import Nav from "../../components/NavbarScroll/Nav";
import logo from "../../assets/img/logo.png";
import { CgMenuRight } from "react-icons/cg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';
import employ from "../../assets/img/employ.gif"
import Footer from '../../components/Footer/Footer';
import { IoIosCloudDone } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { joinApi } from '../../Api/slice/ApiPost';
import { MdError } from "react-icons/md";
import Top from '../../components/Top/Top';
import Done from '../../components/Done/Done';
import load from "../../assets/img/Rolling@1x-1.0s-200px-200px.gif"
function Employment() {
      const [active, setActive] = useState(false);
      const { pathname } = useLocation();
    const [show, setShow] = useState(false);

        const { t } = useTranslation();
  const loading = useSelector((state) => state.posts.isLoading);

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
    const [right, setRight] = useState(false);

  const [name,setName] = useState(null)
  const [phone,setPhone] = useState(null)
  const [email,setEmail] = useState(null)
  const [portfolio_link, setPortfolio_link] = useState(null);
  const [resume, setResume] = useState(null);
  const [showDone, setShowDone] = useState(false);
  const [text, setText] = useState("");
  const handleDoneClose = () => setShowDone(false);
  const handleDoneModal = () => {
    setShowDone(true);
    setText(t("global.done.text2"));
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
     if (portfolio_link == null) {
       errors.portfolio_link = "هذا الحقل مطلوب";
     }
     if (resume == null) {
       errors.resume = "هذا الحقل مطلوب";
     }

     setTimeout(() => {
       setErrors({});
     }, 3000);

     return errors;
   };
   const [errors, setErrors] = useState({});
   const fileInputRef = useRef(null);

  const handleFileInputClick = (e) => {
    e.preventDefault();
     fileInputRef.current.click();
   };
  const dispatch = useDispatch();

 
  console.log(resume)
  
  const handleJoin = async (e) => {
    e.preventDefault();

    const formData = { name,phone, email,
   portfolio_link,
 resume}
console.log(formData)
    const joinErr = validate();
       if (Object.keys(joinErr).length === 0) {
         try {
           await dispatch(joinApi(formData)).then((result) => {
             if (result?.payload?.status === 201) {
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
         setErrors(joinErr);
       }
  };
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
            name={t("global.props.employment")}
            Class="header2"
            bottom={scrollToBottom}
          />
        ) : null}
        <Nav
          name={t("global.props.employment")}
          Class="header3"
          bottom={scrollToBottom}
        />
        <div className="employment">
          <Container>
            <div className="row land">
              <div className="col-12 text-center " data-aos="zoom-in">
                <div className="em-title">
                  <span>{t("global.employment.title")} </span>
                  <span>{t("global.employment.subtitle")}</span>
                </div>
                <p>{t("global.employment.description")}</p>
                <img src={employ} alt="" />
              </div>
            </div>
          </Container>
        </div>
        <div
          className="employ-form"
          style={{ marginTop: "250px", marginBottom: "100px" }}
        >
          <div className="container">
            <span className="t-form mb-4" data-aos="fade-left">
              {t("global.employment.formTitle")}
            </span>
            <div
              className="row d"
              style={{ boxShadow: " 0px 1px 14px 0px rgba(0, 0, 0, 0.25)" }}
              data-aos="zoom-in"
            >
              <div className="col-12 pt-5 pb-5">
                <form
                  action=""
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="row gap-5  d-flex justify-content-center mb-4"
                    style={{ width: "100%" }}
                  >
                    <div className="col-lg-3 col-md-10 col-sm-10">
                      {" "}
                      <input
                        className="w-100 px-3"
                        type="text"
                        placeholder={t("global.employment.fullNamePlaceholder")}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name ? (
                        <>
                          <p
                            style={{
                              width: "100%",
                              fontFamily: "IBM Plex Sans Arabic, sans-serif",

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
                    </div>
                    <div className="col-lg-3 col-md-10 col-sm-10">
                      <input
                        type="text"
                        className="w-100 px-3"
                        placeholder={t("global.employment.emailPlaceholder")}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email ? (
                        <>
                          <p
                            style={{
                              width: "100%",
                              fontFamily: "IBM Plex Sans Arabic, sans-serif",

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
                    </div>
                    <div className="col-lg-3 col-md-10 col-sm-10">
                      <input
                        type="text"
                        className="w-100 px-3"
                        placeholder={t("global.employment.phonePlaceholder")}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {errors.phone ? (
                        <>
                          <p
                            style={{
                              width: "100%",
                              fontFamily: "IBM Plex Sans Arabic, sans-serif",

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
                    </div>
                  </div>
                  <div
                    className="row d-flex justify-content-center p-1 gap-4"
                    style={{ width: "100%" }}
                  >
                    <div className="col-lg-10 col-md-10 col-sm-12">
                      <input
                        className="w-100 px-3"
                        type="text"
                        placeholder={t(
                          "global.employment.portfolioLinkPlaceholder"
                        )}
                        onChange={(e) => setPortfolio_link(e.target.value)}
                      />
                      {errors.portfolio_link ? (
                        <>
                          <p
                            style={{
                              width: "100%",
                              fontFamily: "IBM Plex Sans Arabic, sans-serif",

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
                    </div>
                    <div
                      className="col-lg-10 col-md-10 col-sm-12"
                      style={{ backgroundColor: "#F8F8F8" }}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{
                          display: "none",
                          direction: "ltr",
                          padding: "15px",
                        }}
                        placeholder={t("global.employment.resumePlaceholder")}
                        onChange={(e) => setResume(e.target.files[0])}
                      />

                      <div
                        className="custom-filepu-int d-flex align-items-center justify-content-between p-3"
                        onClick={handleFileInputClick}
                      >
                        <span className="resume-name">
                          {resume
                            ? resume.name
                            : t("global.employment.resumePlaceholder")}
                        </span>
                        <button className="resume-btn">
                          {t("global.employment.btnResume")}
                        </button>
                      </div>
                      {errors.resume ? (
                        <>
                          <p
                            style={{
                              fontFamily: "IBM Plex Sans Arabic, sans-serif",

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
                    </div>
                  </div>
                  {right === true && (
                    <span
                      className="text-center d-flex gap-2 align-items-center justify-content-center"
                      style={{ color: "green", fontSize: "22px" }}
                    >
                      <IoIosCloudDone />
                      {t("global.employment.successMessage")}
                    </span>
                  )}
                  <div className="em-btn col-12">
                    <button
                      className="em-send"
                      onClick={handleJoin}
                      disabled={loading == true ? true : false}
                    >
                      {loading == true ? <img src={load} alt="" style={{width:"50px",maxWidth:"100%"}}/> :t("global.employment.submitButton")}
                    
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Top />
        <div ref={bottomRef}>
          <Footer />
        </div>
        <Done memoDone={memoDone} />
      </>
    );
}

export default Employment