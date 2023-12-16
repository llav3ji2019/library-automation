import axios from "axios";
import { AuthorizationStatus } from "../../const";
import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import {useNavigate} from 'react-router-dom';
import { AppRoute } from "../../const";
import { saveToken } from "../../token/token";

type LoginPageProps = {
  loginStatus: AuthorizationStatus,
  setLoginStatus: Dispatch<SetStateAction<AuthorizationStatus>>  
}

function LoginPage({loginStatus, setLoginStatus}: LoginPageProps): JSX.Element {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const postLoginRequest = (username: string, password: string) => {
   axios.post<string>(
    'http://localhost:8080/library/login',
    {
      username: username,
      password: password,
    },
    {
      headers: {
        Accept: 'application/json',
      },
    },
  ).then(response => {
    if (response.data === AuthorizationStatus.Admin) {
      saveToken(AuthorizationStatus.Admin);
      setLoginStatus(AuthorizationStatus.Admin);
    } else if (response.data === AuthorizationStatus.Worker) {
      saveToken(AuthorizationStatus.Worker);
      setLoginStatus(AuthorizationStatus.Worker);
    } else {
      setLoginStatus(AuthorizationStatus.Unknown);
      saveToken(AuthorizationStatus.Unknown);
    }
    
    return response;
  }).catch((exception) => {
    console.log(exception);
  });
  }

  const handleUsernameChange = (evt: FormEvent<HTMLInputElement>) => {
    setUsername(evt.currentTarget.value)
  }

  const handlePasswordChange = (evt: FormEvent<HTMLInputElement>) => {
    setPassword(evt.currentTarget.value)
  }

  return (
    <main className="login-page">
      <section className="login">
        <h2 className="login__login-title">Login</h2>
        <form>
          <div className="login-block">
            <input name = "username" type = "text" className="login__username-input" autoComplete="off" onChange={handleUsernameChange}/>
            <label>Userame</label>

          </div>
          <div className="login-block">
            <input name = "password" type = "password" className="login__password-input" autoComplete="off" onChange={handlePasswordChange}/>
            <label>Password</label>
          </div>
        </form>  
        <input type="submit" name="submit" value="Submit" onClick={() => {
            postLoginRequest(username, password);
            
            if (loginStatus !== AuthorizationStatus.Unknown) {
              navigate(AppRoute.Main);
            }
          }}/>      
    </section>
    </main>
  );
}

export default LoginPage;
