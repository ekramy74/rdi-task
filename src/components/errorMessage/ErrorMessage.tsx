import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const ErrorMessage = styled((props: any) => (
  <Typography variant={"subtitle1"} {...props} />
))(({ theme }) => ({
  color: theme.palette.error.main,
}));
export default ErrorMessage;
