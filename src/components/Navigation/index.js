import '../../style/Header/style.css';
import Spotify_Logo from '../../Spotify_Logo.png';
import { BrowserRouter as Router} from 'react-router-dom';


const NavigationBar = () => {
  return (
    <Router>
      <header data-testid="nav-test">
      <div class="container">
        <div class="header-left">
          <img class="logo" src={Spotify_Logo} alt="No Logo This time"/>
        </div>
        <span class="fa fa-bars menu-icon"></span>
        <div class="header-right">
          <a href="/CreatePlaylist">Playlist</a>
          <a href="https://developer.spotify.com/dashboard/login">Register</a>
        </div>
      </div>
    </header>
    </Router>
  );
};

export default NavigationBar;
