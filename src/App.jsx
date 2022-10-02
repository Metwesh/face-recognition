import { Component } from "react";
import { Spinner } from "react-bootstrap";
import FaceRecognition from "./components/FaceRecognition";
import ImageLinkForm from "./components/ImageLinkForm";
import Modal from "./components/Modal";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";
import Rank from "./components/Rank";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      boxes: [],
      route: "",
      isSignedIn: false,
      isProfileOpen: false,
      token: "",
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem("token");
    if (!token) return this.onRouteChange("signIn");
    this.setState({ token });
    fetch(`${process.env.REACT_APP_SIGNIN}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          fetch(`${process.env.REACT_APP_PROFILE}/${data.id}`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((user) => {
              if (user.name) {
                this.loadUser(user);
                this.onRouteChange("home");
              }
            });
        }
      })
      .catch((err) => console.log(err));
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocations = (data) => {
    if (!data.outputs) return (this.boxes = []);
    return data.outputs[0].data.regions.map((face) => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById("inputimage");
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
        leftCol: clarifaiFace.left_col * width,
      };
    });
  };

  displayFaceBoxes = (boxes) => {
    if (!boxes) return (this.boxes = []);
    this.setState({ boxes: boxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = async () => {
    this.setState({
      imageURL: this.state.input,
      entries: this.state.user.entries,
    });
    fetch(`${process.env.REACT_APP_IMAGE_URL}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch(`${process.env.REACT_APP_IMAGE}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${this.state.token}`,
            },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              if (count === "Unauthorized") {
                window.sessionStorage.removeItem("token");
                return this.onRouteChange("signIn");
              }
              this.setState(
                Object.assign(this.state.user, { entries: count.entries })
              );
            })
            .catch((error) => console.log(error));
        }
        this.displayFaceBoxes(this.calculateFaceLocations(response));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    this.setState({ isSignedIn: false, imageURL: "" });
    if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen,
    }));
  };

  render() {
    const { isSignedIn, imageURL, route, boxes, isProfileOpen, user, token } =
      this.state;
    return (
      <main className="App">
        {route === "" && (
          <div
            style={{ width: "100vw", height: "100vh" }}
            className="flex justify-center items-center"
          >
            <Spinner animation="border" className="loading-spinner" />
          </div>
        )}
        {route !== "" && (
          <Navigation
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}
            toggleModal={this.toggleModal}
          />
        )}
        {route === "signIn" && (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
        {route === "Register" && (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
        {route === "home" && (
          <>
            <Rank
              loadUser={this.loadUser}
              name={user.name}
              entries={user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageURL={imageURL} />
          </>
        )}
        {isProfileOpen && (
          <Modal>
            <Profile
              isProfileOpen={isProfileOpen}
              toggleModal={this.toggleModal}
              loadUser={this.loadUser}
              user={user}
              token={token}
            />
          </Modal>
        )}
      </main>
    );
  }
}
