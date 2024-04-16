import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import PageContainer from "../../components/container/PageContainer";
import landingImg from "../../assets/imgs/landingImg.jpg";
import echoServiceImg from "../../assets/imgs/whoAreWeVector.webp";
import { ThemeSettings } from "../../theme/theme";
import { useNavigate } from "react-router-dom";

function Home() {
  const theme = ThemeSettings();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  return (
    <PageContainer title='RDI - Home' description='This is the landing page'>
      <Box
        sx={{
          backgroundImage: `url(${landingImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "calc(100vh - 65px)",
        }}
      >
        <Box>
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              borderRadius: "5px",
              margin: "auto",
              textAlign: "center",
              height: "calc(100vh - 65px)",
              width: "100%",
            }}
          >
            <Box
              sx={{
                position: "relative",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <Typography variant='h2' sx={{ color: "#fff", mt: 0 }}>
                Welcome to Echo service
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
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
        <Box
          sx={{
            width: md ? "100%" : "50%",
          }}
        >
          <Typography variant='h6' sx={{ mt: 5, fontWeight: "bold" }}>
            Echo service
          </Typography>
          <Typography variant='body1' sx={{ mt: 5 }}>
            Welcome to our groundbreaking service that is poised to
            revolutionize the landscape of artificial intelligence. Our
            innovative platform offers users the unparalleled capability to
            transform Arabic audio files effortlessly. With just a few clicks,
            users can upload their Arabic audio files or even record fresh
            content directly from their microphone. Our service then employs
            cutting-edge technology to imbue these audio clips with a futuristic
            electronic voice, breathing new life into every sound. But that's
            not all – we go the extra mile by incorporating a unique echo
            effect, repeating the final word three times, leaving a lasting
            impression on every listener.
          </Typography>
          <Button
            variant='outlined'
            sx={{ mt: 2 }}
            onClick={() => navigate("/about")}
          >
            Learn more
          </Button>
        </Box>
        <Box>
          <img src={echoServiceImg} alt='echo service' width={500} />
        </Box>
      </Box>
    </PageContainer>
  );
}

export default Home;
