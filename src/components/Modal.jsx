import React from "react";
import * as ReactDOM from "react-dom";
import "./Modal.css";

const modalRoot = document.getElementById("modal-root");

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.divElement = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.divElement);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.divElement);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.divElement);
  }
}
