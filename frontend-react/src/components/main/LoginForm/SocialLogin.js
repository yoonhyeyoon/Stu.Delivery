function SocialLogin() {
  const API_BASE_URL = "https://i6d201.p.ssafy.io/api";
  const ACCESS_TOKEN = "accessToken";

  const OAUTH2_REDIRECT_URI = "http://localhost:3000/oauth2/redirect";

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

  return (
    <div className="social-login">
      <a href={GOOGLE_AUTH_URL} style={style}>
        Login with Google
      </a>
      <a href={FACEBOOK_AUTH_URL} style={style}>
        Login with Facebook
      </a>
      <a href={GITHUB_AUTH_URL} style={style}>
        Login with Github
      </a>
    </div>
  );
}
export default SocialLogin;
