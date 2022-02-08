import LoginForm from "../../components/main/LoginForm/LoginForm";
// import styles from "./Signup.module.css";
import styles from "./Login.module.css";

const Login = (props) => {
  console.log(props);
  return (
    <>
      <div className={styles.backImage}></div>
      <LoginForm authenticated={props.authenticated} />
    </>
  );
};

export default Login;
