import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

export default class Register extends React.Component {
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

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem("token", token);
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
          this.saveAuthTokenInSession(user.token);
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          this.setState({ signUpFailed: true });
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { signUpFailed, signUpName, signUpEmail, signUpPassword } =
      this.state;
    let signUpMessage;
    if (signUpFailed && !signUpName && !signUpEmail && !signUpPassword) {
      signUpMessage = "Please input your credentials";
    } else if (signUpFailed && !signUpName) {
      signUpMessage = "Please input your name";
    } else if (signUpFailed && !signUpEmail) {
      signUpMessage = "Please input your E-mail";
    } else if (signUpFailed && !signUpPassword) {
      signUpMessage = "Please input your password";
    }
    return (
      <Form
        onSubmit={(e) => e.preventDefault()}
        className="br2 ba dark-gray b--black-10 w-100 w-50-m w-60-1 mw6 center mv4 pa2 shadow-5"
        style={{ backgroundColor: "rgba(234, 234, 234, 0.5)" }}
      >
        <main className="pa4 black-80">
          <article className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <FloatingLabel controlId="name" label="Name" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="John Doe"
                    name="name"
                    autoComplete="off"
                    onChange={this.onNameChange}
                    required
                  />
                </FloatingLabel>
              </div>
              <div className="mt3">
                <FloatingLabel
                  controlId="email-address"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    name="email-address"
                    autoComplete="off"
                    onChange={this.onEmailChange}
                    required
                  />
                </FloatingLabel>
              </div>
              <div className="mv3">
                <FloatingLabel controlId="password" label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={this.onPasswordChange}
                  />
                </FloatingLabel>
              </div>
            </fieldset>
            <div className="flex justify-between items-center">
              <Button
                variant="dark"
                type="submit"
                onClick={this.onSubmitSignUp}
                size="lg"
              >
                Register
              </Button>
              <Button
                variant="outline-dark"
                type="button"
                onClick={() => this.props.onRouteChange("signIn")}
                size="lg"
              >
                Sign in
              </Button>
            </div>
          </article>
          {signUpMessage && <p className="mt4 mb0">{signUpMessage}</p>}
        </main>
      </Form>
    );
  }
}
