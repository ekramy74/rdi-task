import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeSettings } from "../../theme/theme";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const theme = ThemeSettings();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (url: string) => {
    setAnchorEl(null);
    navigate(url);
  };

  const StyledLink = styled(Link)(() => ({
    color: "#000",
    textDecoration: "none",
    marginRight: "10px",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      color: "#f76329",
    },
  }));

  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "none",
        borderBottom: (theme) => `1px solid ${theme.palette.grey[300]}`,
        mb: 2,
      }}
    >
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          RDI - Task
        </Typography>
        {!sm ? (
          <>
            <StyledLink to={"/"}>Home</StyledLink>
            <StyledLink to={"/about"}>About</StyledLink>
            <StyledLink to={"/echo"}>Echo</StyledLink>
          </>
        ) : (
          <>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleMenuClose("/")}>Home</MenuItem>
              <MenuItem onClick={() => handleMenuClose("/about")}>
                About
              </MenuItem>
              <MenuItem onClick={() => handleMenuClose("/echo")}>Echo</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
