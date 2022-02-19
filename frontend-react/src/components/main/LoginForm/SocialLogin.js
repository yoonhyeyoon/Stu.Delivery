import { Button } from "@mui/material";
import styles from "./Login.module.css";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

function SocialLogin() {
  const API_BASE_URL = "https://i6d201.p.ssafy.io/api";

  const OAUTH2_REDIRECT_URI = "https://i6d201.p.ssafy.io/oauth2/redirect";

  const GOOGLE_AUTH_URL =
    API_BASE_URL +
    "/oauth2/authorize/google?redirect_uri=" +
    OAUTH2_REDIRECT_URI;
  const FACEBOOK_AUTH_URL =
    API_BASE_URL +
    "/oauth2/authorize/facebook?redirect_uri=" +
    OAUTH2_REDIRECT_URI;
  const GITHUB_AUTH_URL =
    API_BASE_URL +
    "/oauth2/authorize/github?redirect_uri=" +
    OAUTH2_REDIRECT_URI;

  let style = {
    color: "black",
    textDecoration: "none",
    opacity: 0.7,
    padding: "0 1.3em 0",
  };
  const onGoogle = () => {};
  return (
    <div className="social-login">
      <Button
        className={styles.social_btn}
        fullWidth
        variant="contained"
        style={{ background: "rgba(242, 242, 232, 0.7)", color: "black" }}
        sx={{ mb: 2 }}
        onClick={() => (window.location.href = GOOGLE_AUTH_URL)}
      >
        <GoogleIcon sx={{ marginRight: 1 }} /> Login with Google
      </Button>
      <Button
        className={styles.social_btn}
        fullWidth
        variant="contained"
        style={{ background: "rgba(242, 242, 232, 0.7)", color: "black" }}
        sx={{ mb: 2 }}
        onClick={() => (window.location.href = GITHUB_AUTH_URL)}
      >
        <GitHubIcon sx={{ marginRight: 1 }} /> Login with Github
      </Button>
    </div>
  );
}
export default SocialLogin;
