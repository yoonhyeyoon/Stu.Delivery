import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  ACCESS_TOKEN,
} from "../../constants";

function SocialLogin() {
  return (
    <div className="social-login">
      <a href={GOOGLE_AUTH_URL}>Log in with Google</a>;
      <a href={FACEBOOK_AUTH_URL}>Log in with Facebook</a>;
      <a href={GITHUB_AUTH_URL}>Log in with Github</a>;
    </div>
  );
}
export default SocialLogin;
