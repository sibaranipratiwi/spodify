const {
  REACT_APP_SPOTIFY_CLIENT_ID,
  REACT_APP_AUTHORIZE_URL,
  REACT_APP_REDIRECT_URL,
} = process.env;
const SCOPES = ["playlist-modify-private", "playlist-read-private", "user-read-private", "user-read-email"];
const ENDPOINT_URL = "https://api.spotify.com/v1";

const getToken = (hash) => {
  const subStringHash = hash.substring(1);
  const paramInUrl = subStringHash.split("&");
  const splitingParam = paramInUrl.reduce((acc, currentValue) => {
    const [key, value] = currentValue.split("=");
    acc[key] = value;
    return acc;
  }, {});
  return splitingParam;
};

const handleLogin = () => {
 window.location.replace(
  `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&scope=${SCOPES}&response_type=token&show_dialog=true`
 );
};

const getUserProfile = (token) => {
  return fetch(`${ENDPOINT_URL}/me`, {
    headers: {
      Authorization: "Bearer" + token,
    },
  }).then((respon) => respon.json());
};

export { handleLogin, getUserProfile, getToken };
