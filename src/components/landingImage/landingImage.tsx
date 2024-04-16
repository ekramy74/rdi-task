import { Box, Typography } from "@mui/material";
import landingImg from "../../assets/imgs/landingImg.jpg";

export default function LandingImage({
  backgroundImage,
  title,
}: {
  backgroundImage?: string;
  title?: string;
}) {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage || landingImg})`,
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
              {title || " Welcome to Echo service"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
