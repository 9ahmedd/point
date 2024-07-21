import React, { useEffect, useState } from "react";
import logoM from "../../assets/img/logoM.png";
import "./NavM.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function NavM(props) {
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
  return (
    <>
      <div className="header-serv">
        <div className="container">
          <div className="nav">
            <div className="links">
              <Link to="/servs">{t("global.nav.serv_link")}</Link>
              <Link to="/who">{t("global.nav.who")}</Link>
              <Link to="/phil">{t("global.nav.phil")}</Link>
              <Link to="">
                <span onClick={props?.bottom}>{t("global.nav.success")}</span>
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
              <img
                src={logoM}
                alt=""
                
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavM;
