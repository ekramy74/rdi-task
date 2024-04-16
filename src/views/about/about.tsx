import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import PageContainer from "../../components/container/PageContainer";
import aboutImg from "../../assets/imgs/about.jpg";
import echoServiceImg from "../../assets/imgs/whoAreWeVector.webp";
import { ThemeSettings } from "../../theme/theme";
import { useNavigate } from "react-router-dom";
import LandingImage from "../../components/landingImage/landingImage";

function Home() {
  const theme = ThemeSettings();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  return (
    <PageContainer title='RDI - about' description='This is the about page'>
      <LandingImage title=' About Echo service' backgroundImage={aboutImg} />
      <Box
        sx={{
          px: 30,
          display: "flex",
          flexDirection: md ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          my: 5,
          height: "calc(100vh - 65px)",
          columnGap: 10,
          rowGap: 5,
        }}
      >
        <Box>
          <img src={echoServiceImg} alt='echo service' width={500} />
        </Box>
        <Box
          sx={{
            width: md ? "100%" : "50%",
          }}
        >
          <Typography variant='h6' sx={{ mt: 5, fontWeight: "bold" }}>
            Echo service
          </Typography>
          <Typography variant='body1' sx={{ mt: 5 }}>
            At our core, we are driven by a relentless passion for innovation
            and a commitment to pushing the boundaries of what's possible in the
            realm of artificial intelligence. Our journey began with a vision to
            revolutionize how Arabic audio content is experienced and interacted
            with. Through tireless research and development, we've crafted a
            groundbreaking service that seamlessly blends advanced audio
            processing techniques with state-of-the-art AI algorithms. Our
            mission is simple yet ambitious – to empower individuals and
            businesses alike with the tools they need to transform ordinary
            audio into extraordinary experiences. Join us on this exhilarating
            journey as we continue to push the limits of innovation and redefine
            the future of AI-powered audio technologies.
          </Typography>
          <Button
            variant='outlined'
            sx={{ mt: 2 }}
            onClick={() => navigate("/echo")}
          >
            Try it now
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
}

export default Home;
