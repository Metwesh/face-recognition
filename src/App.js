import React, { Component } from "react";
import Navigation from "./components/Navigation";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";
import Rank from "./components/Rank";
import SignIn from "./components/SignIn";
import Register from "./components/Register";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      boxes: [],
      route: "signIn",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
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
    this.setState({ boxes: boxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({
      imageURL: this.state.input,
      entries: this.state.user.entries,
    });
    fetch(process.env.REACT_APP_IMAGE_URL, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch(process.env.REACT_APP_IMAGE, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(
                Object.assign(this.state.user, { entries: count.entries })
              );
            })
            .catch(console.log);
        }
        this.displayFaceBoxes(this.calculateFaceLocations(response));
      })
      .catch(console.log);
  };

  onRouteChange = (route) => {
    this.setState({ isSignedIn: false, imageURL: "" });
    if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageURL, route, boxes } = this.state;
    return (
      <div className="App">
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <>
            <Rank
              loadUser={this.loadUser}
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageURL={imageURL} />
          </>
        ) : route === "signIn" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
