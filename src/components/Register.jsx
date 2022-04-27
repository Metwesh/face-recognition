import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpEmail: "",
      signUpPassword: "",
      signUpName: "",
      signUpFailed: false,
    };
  }
  onNameChange = (event) => {
    this.setState({ signUpName: event.target.value, signUpFailed: false });
  };
  onEmailChange = (event) => {
    this.setState({ signUpEmail: event.target.value, signUpFailed: false });
  };
  onPasswordChange = (event) => {
    this.setState({ signUpPassword: event.target.value, signUpFailed: false });
  };

  onSubmitSignUp = () => {
    fetch(`${process.env.REACT_APP_REGISTER}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.signUpName,
        hash: this.state.signUpPassword,
        email: this.state.signUpEmail,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          this.setState({ signUpFailed: true });
        }
      });
  };

  render() {
    const { signUpFailed, signUpName, signUpEmail, signUpPassword } =
      this.state;
    let signUpMessage;
    if (signUpFailed && !signUpName && !signUpEmail && !signUpPassword) {
      signUpMessage = <p>Please input your credentials</p>;
    } else if (signUpFailed && !signUpName) {
      signUpMessage = <p>Please input your name</p>;
    } else if (signUpFailed && !signUpEmail) {
      signUpMessage = <p>Please input your E-mail</p>;
    } else if (signUpFailed && !signUpPassword) {
      signUpMessage = <p>Please input your password</p>;
    }
    return (
      <div
        className="br2 ba dark-gray b--black-10 w-100 w-50-m w-60-1 mw6 center mv4 pa2 shadow-5"
        style={{ backgroundColor: "rgba(234, 234, 234, 0.5)" }}>
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 tl" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  required
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 tl" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="off"
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
                onClick={this.onSubmitSignUp}
                className="b ph3 pv2 input-reset ba white bg-black dim pointer f6 dib br4 mv2"
                type="submit"
                value="Register"
              />
            </div>
          </div>
          {signUpMessage}
        </main>
      </div>
    );
  }
}

export default Register;
