import React from 'react';



const Overlay = ({ onSignInClick, onSignUpClick }) => {

  return (

    <div className="overlay-container">

      <div className="overlay">

        <div className="overlay-panel overlay-left">

          <h1>Welcome Back!</h1>

          <p>To keep connected with us <br /> login with your personal info</p>

          <button className="ghost" onClick={onSignInClick}>Sign In</button>

        </div>

        <div className="overlay-panel overlay-right">

          <h1>Hello, Friend!</h1>

          <p>Enter your personal details <br />and start your journey with us</p>

          <button className="ghost" onClick={onSignUpClick}>Sign Up</button>

        </div>

      </div>

    </div>

  );

};



export default Overlay;