import React from "react";
import { Button, CloseButton, FloatingLabel, Form } from "react-bootstrap";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      password: "",
      token: this.props.token
    };
  }

  onFormChange = (event) => {
    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "user-email":
        this.setState({ email: event.target.value });
        break;
      case "user-password":
        this.setState({ password: event.target.value });
        break;
      default:
        return;
    }
  };

  onProfileUpdate = (data) => {
    if (!this.state.token) this.setState({ token: window.sessionStorage.getItem("token")})
    fetch(`${process.env.REACT_APP_PROFILE}/${this.props.user.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({ formInput: data }),
    })
      .then((response) => {
        if (response.status !== 200 || response.status !== 304) return;
        this.props.toggleModal();
        this.props.loadUser({ ...this.props.user, ...data });
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { user, toggleModal } = this.props;
    const { name, email, password } = this.state;
    return (
      <div className="profile-modal">
        <Form
          onSubmit={(e) => e.preventDefault()}
          className="br2 ba dark-gray b--black-10 w-100 w-50-m w-60-1 mw6 center mv4 pa2 shadow-5 bg-white"
        >
          <main className="pa4 black-80">
            <CloseButton onClick={toggleModal} className="flex ml-auto" />
            <div className="flex items-center mb-3">
              <svg
                className="br-100 h3 w3 dib mb0"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"
                  fill="#000"
                />
              </svg>
              <h1>
                <span style={{ visibility: "hidden" }}>J</span>
                {this.state.name}
              </h1>
            </div>
            <h4 className="fw4">
              {"Images submitted: "}
              <span className="fw3">{user.entries}</span>
            </h4>
            <h4 className="mb-4 fw4">
              {"Member since: "}
              <span className="fw3">
                {new Date(user.joined).toDateString()}
              </span>
            </h4>
            <hr />
            <article className="measure center">
              <fieldset id="edit-profile" className="ba b--transparent ph0 mh0">
                <div className="mt3">
                  <FloatingLabel controlId="name" label="Name" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      name="user-name"
                      autoComplete="off"
                      defaultValue={name}
                      onChange={this.onFormChange}
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
                      name="user-email"
                      autoComplete="off"
                      defaultValue={email}
                      onChange={this.onFormChange}
                      required
                    />
                  </FloatingLabel>
                </div>
                <div className="mv3">
                  <FloatingLabel controlId="password" label="Password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="user-password"
                      required
                      onChange={this.onFormChange}
                    />
                  </FloatingLabel>
                </div>
              </fieldset>
              <Button
                className="flex ml-auto"
                variant="dark"
                type="submit"
                onClick={() => this.onProfileUpdate({ name, email, password })}
                size="lg"
              >
                Update info
              </Button>
            </article>
          </main>
        </Form>
      </div>
    );
  }
}
