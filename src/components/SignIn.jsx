import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

export default class SignIn extends React.Component {
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

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem("token", token);
  };

  onSubmitSignIn = () => {
    fetch(`${process.env.REACT_APP_SIGNIN}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === "true") {
          this.saveAuthTokenInSession(data.token);
          fetch(`${process.env.REACT_APP_PROFILE}/${data.id}`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${data.token}`,
            },
          })
            .then((response) => response.json())
            .then((user) => {
              if (user.name) {
                this.props.loadUser(user);
                this.props.onRouteChange("home");
              }
            });
        } else {
          this.setState({ signInFailed: true });
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { signInFailed, signInEmail, signInPassword } = this.state;
    let signInMessage;
    if (signInFailed && !signInEmail && !signInPassword) {
      signInMessage = "Please input your credentials";
    } else if (signInFailed && !signInEmail) {
      signInMessage = "Please input your E-mail";
    } else if (signInFailed && !signInPassword) {
      signInMessage = "Please input your password";
    } else if (signInFailed) {
      signInMessage = "Please enter a valid email & password combination";
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
              <legend className="f3 fw6 ph0 mh0 mb2">Sign In</legend>
              <div className="mv3">
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
                onClick={this.onSubmitSignIn}
                size="lg"
              >
                Sign in
              </Button>
              <Button
                variant="outline-dark"
                type="button"
                onClick={() => this.props.onRouteChange("Register")}
                size="lg"
              >
                Register
              </Button>
            </div>
          </article>
          {signInMessage && <p className="mt4 mb0">{signInMessage}</p>}
        </main>
      </Form>
    );
  }
}
