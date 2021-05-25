import React from "react";

export default function Footer() {
    return (
      <footer className="footer d-flex justify-content-center">
        <div className="align-self-center">
          © {(new Date().getFullYear())}
        </div>
      </footer>
    );
}
