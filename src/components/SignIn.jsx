import React from "react";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      signInFailed: false,
    };
  }
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value, signInFailed: false });
  };
  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value, signInFailed: false });
  };

  onSubmitSignIn = () => {
    fetch("https://safe-hollows-95641.herokuapp.com//signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          this.setState({ signInFailed: true });
        }
      });
  };

  render() {
    const { signInFailed, signInEmail, signInPassword } = this.state;
    let signInMessage;
    if (signInFailed && !signInEmail && !signInPassword) {
      signInMessage = <p>Please input your credentials</p>;
    } else if (signInFailed && !signInEmail) {
      signInMessage = <p>Please input your E-mail</p>;
    } else if (signInFailed && !signInPassword) {
      signInMessage = <p>Please input your password</p>;
    } else if (signInFailed) {
      signInMessage = (
        <p>Please enter a valid email &amp; password combination</p>
      );
    }

    return (
      <div
        className="br2 ba dark-gray b--black-10 w-100 w-50-m w-60-1 mw6 center mv4 pa2 shadow-5"
        style={{ backgroundColor: "rgba(234, 234, 234, 0.5)" }}
      >
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 tl" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  required
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6 tl" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="flex justify-between items-center">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba white bg-black dim pointer f6 dib br4 mv2"
                type="submit"
                value="Sign in"
              />
            </div>
          </div>
          {signInMessage}
        </main>
      </div>
    );
  }
}

export default SignIn;
