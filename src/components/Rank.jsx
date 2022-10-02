import React from "react";

class Rank extends React.Component {
  constructor() {
    super();
    this.state = {
      emoji: "",
    };
  }

  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps, _prevState) {
    if (
      prevProps.entries === this.props.entries &&
      prevProps.name === this.props.name
    )
      return;
    this.generateEmoji(this.props.entries);
  }

  generateEmoji = (entries) => {
    fetch(
      `https://57njcptzik.execute-api.me-south-1.amazonaws.com/prod/rank?rank=${entries}`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ emoji: data.output }))
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <div className="white f3">
          {`${this.props.name}, your current entry count is...`}
        </div>
        <div className="white f1">{this.props.entries}</div>
        <div className="white f2">Rank badge: {this.state.emoji}</div>
      </div>
    );
  }
}

export default Rank;
