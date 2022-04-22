import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style/searchResult/style.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { green } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: green[500],
  "&:hover": {
    backgroundColor: green[700],
  },
}));

const SearchSong = ({selectButton}) => {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [isSelectButton, setSelectButton] = useState(false);

  const handleSelectButton = () => {
    setSelectButton(!isSelectButton)
    selectButton();
  }

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

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    setArtists(data.artists.items);
  };


  const renderArtists = () => {
    return artists.map((artist) => (
      <div className="Song" data-testid="searchSong">
        <div className="contentSong" key={artist.id}>
          {artist.images.length ? (
            <Card sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box
                className="imageSong"
                sx={{ display: "grid", flexDirection: "row" }}
              >
                <CardContent sx={{ flex: "1 0" }}>
                  <Typography component="div" variant="h6"></Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {artist.name}
                  </Typography>
                  <Button  size="small" variant="outlined" color="success" onClick={handleSelectButton}>{isSelectButton ? 'Deselect' : 'Select'}</Button>
                </CardContent>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151, height: 150}}
                image={artist.images[0].url}
                alt="There is nothing to show"
              />
            </Card>
          ) : (
            <div>Sorry This Song is not available</div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="search" data-testid="search-test">
      <form onSubmit={searchArtists}>
        <TextField
          id="outlined-required"
          label="Find a Song"
          size="small"
          color="success"
          focused
          type="text"
          onChange={(e) => setSearchKey(e.target.value)}
          data-testid="input-test"
        />
        <ColorButton
          variant="outlined"
          size="small"
          color="success"
          type={"submit"}
          data-testid="button-test"
        >
          Search
        </ColorButton>
      </form>
      {renderArtists()}
    </div>
  );
}

export default SearchSong;
