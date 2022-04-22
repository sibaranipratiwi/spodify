import React, { useState, useEffect } from "react";
import SearchSong from "../../components/Search";
import CreatePlaylist from "../../pages/CreatePlaylist";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import NestedModal from "../../components/createPlaylist";
import { handleLogin} from "../../lib/api/authLogin";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: green[500],
  '&:hover': {
    backgroundColor: green[700],
  },
}));

const Login = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div className="SearchMain" data-testid="SearchMain">
      <h1>Search a song</h1>
      {token ? (
        <div>
          <br></br>
          <ColorButton
            variant="outlined"
            size="small"
            color="success"
            onClick={logout}
          >
            LOGOUT
          </ColorButton>
          <SearchSong />
          <CreatePlaylist />
          <NestedModal/>
        </div>
      ) : (
        <div>
          <br></br>
          <ColorButton
            variant="outlined"
            size="small"
            color="error"
            onClick={handleLogin}
          >
            LOGIN
          </ColorButton>
        </div>
      )}
    </div>
  );
};

export default Login;
