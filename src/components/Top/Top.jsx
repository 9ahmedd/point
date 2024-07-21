import React from 'react'
import top from "../../assets/img/Vector.png"
import "./Top.css"
function Top() {
     const scrollToTop = () => {
       window.scrollTo({ top: 0, behavior: "smooth" });
     };
  return (
    <>
      <div className='top' style={{ position: "relative" }}>
        {/* WhatsApp floating icon in bottom-right corner */}
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            zIndex: 1000, // Keeps icon above other content
          }}
          onClick={scrollToTop}
        >
          <a
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: "#8F779A", // Corrected color with hash
              padding: "10px", // Padding to center icon
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Drop shadow for depth
              textDecoration: "none", // Remove underline from link
                          margin: "10px", // Optional margin
              transition:"0.4s"
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* White icon on green background */}
            <img
              src={top}
              alt=""
              style={{ width: "50px", padding: "10px", maxWidth: "100%" }}
            />
          </a>
        </div>
      </div>
    </>
  );
}

export default Top