function LoginPage(): JSX.Element {
  return (
    <main className="login-page">
      <section className="login">
        <h2 className="login__login-title">Login</h2>
        <form>
          <div className="login-block">
            <input name = "username" type = "text" className="login__username-input" autoComplete="off" />
            <label>Userame</label>

          </div>
          <div className="login-block">
            <input name = "password" type = "password" className="login__password-input" autoComplete="off" />
            <label>Password</label>
          </div>
          <input type="submit" name="submit" value="Submit" />
        </form>        
    </section>
    </main>
  );
}

export default LoginPage;
