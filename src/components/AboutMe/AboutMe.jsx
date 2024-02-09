import react from "react";
import Hamburger from "../HambugerMenu/HamburgerMenu";
import Footer from "../Footer/Footer";
import "./AboutMe.css";

const AboutMe = () => {
  return (
    <div>
      <div className="title">
        <header>
          <h1>About Me</h1>
        </header>
      </div>
      <div className="portrait">
        <img src="/public/images/cuteKid.jpg" alt="Chubby Me" />
      </div>
      <div className="aboutMe">
        <p>
          Hi there! I'm Kalea Vang, a licensed esthetician with a true passion
          for skincare and beauty. With years of experience in the field, I have
          honed my skills and knowledge to provide exceptional skincare
          treatments and personalized solutions to help my clients achieve their
          ultimate skin goals My journey as an esthetician began with a deep
          fascination for the science behind healthy skin. I pursued extensive
          training and education, obtaining my license to practice esthetics,
          and continuously investing in expanding my expertise through
          certifications and workshops. This commitment to ongoing professional
          development allows me to stay up-to-date with the latest industry
          trends, cutting-edge technologies, and innovative skincare products As
          an esthetician, my mission is to deliver not just results-oriented
          treatments but a truly relaxing and rejuvenating experience for my
          clients. I firmly believe that self-care should be an integral part of
          everyone's lifestyle, and I strive to create an atmosphere where they
          can unwind, de-stress, and focus on themselves during each
          appointment. Whether it's a customized facial treatment, chemical
          peels, microdermabrasion, or an indulgent body wrap, I tailor every
          service to cater to individual concerns and skin types. By conducting
          thorough skin analyses and consultations, I ensure that the treatments
          and homecare recommendations perfectly.
        </p>
      </div>
    </div>
  );
};
export default AboutMe;
