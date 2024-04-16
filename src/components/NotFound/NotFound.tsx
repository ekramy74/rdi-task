import { Box } from "@mui/material";
import emptyImg from "../../assets/images/svgs/noDataAvailable.svg";
import Typography from "@mui/material/Typography";

export const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        m: 0,
      }}
    >
      <img src={emptyImg} alt={"no data available"} width={250} />
      <Typography
        variant={"body1"}
        sx={{
          color: (theme) => theme.palette.grey[400],
          mt: 2,
        }}
      >
        No data available
      </Typography>
    </Box>
  );
};
