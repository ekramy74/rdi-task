import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {Box} from "@mui/material";

type validationErrorProps = {
    error: string,
    marginTop?: number
}
export const ValidationError = ({error, marginTop}: validationErrorProps) => {
    return (
        <Box display={"flex"} alignItems={"center"}
             sx={marginTop ? {mt: marginTop, wordWrap: 'break-word'} : {wordWrap: 'break-word'}}>
            <ErrorOutlineOutlinedIcon
                fontSize="small"
                sx={{
                    color: "error.main",
                    marginRight: "4px",
                }}
            />
            <ErrorMessage mt={0.5}>{error}</ErrorMessage>
        </Box>
    )
}