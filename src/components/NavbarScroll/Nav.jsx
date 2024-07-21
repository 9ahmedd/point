import React, { useEffect, useState } from 'react'
import logo from '../../assets/img/logo.png'
import { CgMenuRight } from "react-icons/cg";
import './Nav.css';

import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function Nav({name,Class,id,bottom}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [path, setPath] = useState("")
     const { t, i18n } = useTranslation();

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
    setPath(id)
  }, [id])
  
  return (
    <>
      <div className={`${Class}`}>
        <div className="all">
          {" "}
          <img src={logo} alt="" />
          <div className="side" onClick={handleShow}>
            <div>
              <CgMenuRight
                style={{
                  fontSize: "20px",
                  color: "#FFFFFF",
                  cursor: "pointer",
                }}
              />
            </div>
            <span>{name}</span>
          </div>
        </div>
      </div>
      {/* Offcanvas Menu */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="custome-offcanves"
      >
        <Offcanvas.Header>
          <Offcanvas.Title className="off-title">
            <img className="img-offcanves" src={logo} />

            <IoCloseSharp className="close-icon" onClick={handleClose} />
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="offcanves-body">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            {t("global.nav.home")}
          </Link>

          <Link to="/servs" onClick={() => window.top()}>
            {t("global.nav.serv_link")}
          </Link>
          <Link to="/who" onClick={() => window.scrollTo(0, 0)}>
            {t("global.nav.who")}
          </Link>
          <Link to="/phil" onClick={() => window.scrollTo(0, 0)}>
            {t("global.nav.phil")}
          </Link>
          <Link to="">
            <span onClick={bottom}>{t("global.nav.success")}</span>
          </Link>
          <Link to="/"> {t("global.nav.clients")}</Link>
          <Link to="/creations" onClick={() => window.scrollTo(0, 0)}>
            {" "}
            {t("global.nav.creations")}
          </Link>
          <Link to="/employment" onClick={() => window.scrollTo(0, 0)}>
            {" "}
            {t("global.nav.employment")}
          </Link>
          <Link to="#">
            <span onClick={handleWorldIconClick}>
              {" "}
              {t("global.nav.english")}
            </span>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
      {/* Offcanvas Menu */}
    </>
  );
}

export default Nav