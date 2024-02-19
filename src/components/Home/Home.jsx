import Grid from "@mui/material/Grid";
import { Container, Paper } from "@mui/material";

const Home = () => {
  return (
    <>
      <Container className="description">
        <Grid container className="oderting">
          <img src="images/room.webp" className="portrait" />
          <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
            <p className="welcome">
              Welcome to The Glow Up Feature! We specialize in providing a
              rejuvenating experience for all your skincare needs. At The Glow
              Up Feature, we believe that inner beauty deserves to shine through
              glowing and healthy skin. Whether you're seeking a facial to
              address aging signs, acne, hyperpigmentation, or simply to
              maintain radiant skin, we have a range of indulgent options
              designed to leave you feeling refreshed and revitalized. Using
              only the highest quality skincare products, we employ advanced
              techniques and cutting-edge technology to achieve exceptional
              results. We stay up-to-date with the latest industry trends and
              continuously expand our knowledge so that we can recommend the
              most effective treatments and homecare routines for maintaining
              healthy, radiant skin between visits. Not sure where to begin?
              That’s okay! We are passionate about helping clients talk through
              their skin care goals and concerns to find the ideal solution.
            </p>
          </Grid>
        </Grid>
      </Container>

      <div className="title"></div>
      <h1 className="aboutMeTitle">Get to know your esthetician!</h1>
      <Container className="description">
        <Grid container className="sumting">
          <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
          
            <p className ="aboutMeDescription">
              Hi there! I'm Kalea Vang, a licensed esthetician with a true
              passion for skincare and beauty. With years of experience in the
              field, I have honed my skills and knowledge to provide exceptional
              skincare treatments and personalized solutions to help my clients
              achieve their ultimate skin goals My journey as an esthetician
              began with a deep fascination for the science behind healthy skin.
              I pursued extensive training and education, obtaining my license
              to practice esthetics, and continuously investing in expanding my
              expertise through certifications and workshops. This commitment to
              ongoing professional development allows me to stay up-to-date with
              the latest industry trends, cutting-edge technologies, and
              innovative skincare products As an esthetician, my mission is to
              deliver not just results-oriented treatments but a truly relaxing
              and rejuvenating experience for my clients. I firmly believe that
              self-care should be an integral part of everyone's lifestyle, and
              I strive to create an atmosphere where they can unwind, de-stress,
              and focus on themselves during each appointment. Whether it's a
              customized facial treatment, chemical peels, microdermabrasion, or
              an indulgent body wrap, I tailor every service to cater to
              individual concerns and skin types. By conducting thorough skin
              analyses and consultations, I ensure that the treatments and
              homecare recommendations perfectly.
            </p>
          </Grid>
          <img
            className="portrait"
            src="/public/images/cuteKid.jpg"
            alt="Chubby Me"
          />
        </Grid>
      </Container>
    </>
  );
};

export default Home;
