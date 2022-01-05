
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/Auth/action";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom"

function Login() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const handleAdd = () => {
    const action = loginSuccess(true);
    dispatch(action);
  };
  if(isAuth)
  {
    return <Redirect to="/" />
  }
  return (
    <div>
      <h3>Login</h3>
      <button onClick={handleAdd}>Please click for login</button>
    </div>
  );
}

export default Login;
