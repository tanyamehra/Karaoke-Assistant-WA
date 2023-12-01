import React from 'react';
import './About.css'

const About = () => {
  return (
    <div className="about">
      <h2>
      Welcome to the Karaoke Assistant App!
      </h2>
      <p>
      This web application was created as a bachelor's 
      thesis for the bachelor's degree in Computer Science at Warsaw University of Technology, 
      Faculty of Electronics and Information Technology. 
      </p>
      <p>
        Developed by: <strong>Tanya Mehra</strong>
      </p>
      <p>
      Under the supervision of: <strong>dr. inż. Roman Podraza</strong>
      </p>
      <p>
      The Karaoke Assistant is a web application aimed for the use of non-singers and/or karaoke 
      enthusiasts. It allows users to detect their approximate vocal range, and to receive song 
      recommendations for the detected vocal range. It was coded using ReactJS and Node.js, and 
      it is connected to a MySQL database.
      </p>
    </div>
  );
};

export default About;
