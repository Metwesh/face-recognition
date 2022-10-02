import React from "react";
import { Dropdown } from "react-bootstrap";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    style={{ textDecoration: "none", fontSize: "inherit" }}
    className="d-inline-block h3 mb0"
    href="#0"
    title="Profile"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <span className="dim" style={{ color: "white" }}>
      <svg
        className="br-100 h3 w3 dib mb0 shadow-2"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"
          fill="#ffff"
        />
      </svg>
      {children}
    </span>
  </a>
));

CustomToggle.displayName = "CustomToggle";

export default class ProfileIcon extends React.Component {
  render() {
    return (
      <div className="pa4 tc">
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="profile-dropdown">
            &nbsp;&#x25bc;
          </Dropdown.Toggle>

          <Dropdown.Menu className="shadow-4">
            <Dropdown.Item onClick={this.props.toggleModal}>
              View profile
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.props.onRouteChange("signIn");
                window.sessionStorage.removeItem("token");
              }}
            >
              Sign out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
