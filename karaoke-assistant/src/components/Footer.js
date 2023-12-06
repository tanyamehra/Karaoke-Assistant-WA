import React, { useState } from 'react';
import './Footer.css';
import { Drawer } from "antd";

const Footer = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <footer className="footer">
        <button className="feedback-btn" onClick={() => setOpen(true)}>
          Feedback
        </button>
        <Drawer title="Feedback" placement="right" onClose={() => setOpen(false)}
        open={open} size="large">
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScG6I4Fliwr-rPtB3EObQillIRf8wXrw3zz4WnQe_gF5A7TIQ/viewform?embedded=true" width="700" height="520" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </Drawer>
      </footer>
    </>
  );
};

export default Footer;