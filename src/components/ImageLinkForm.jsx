import { Button, FloatingLabel, Form } from "react-bootstrap";
import "./carbon.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <>
      <p className="f3">
        This magic brain will detect faces in your pictures. Give it a try!
      </p>
      <Form
        onSubmit={(e) => e.preventDefault()}
        className="pa4 br3 shadow-5 center carbon w-70"
      >
        <div className="flex justify-between">
          <FloatingLabel
            controlId="floatingInput"
            label="Input image link here"
          >
            <Form.Control
              type="text"
              placeholder="Image link"
              autoComplete="off"
              onChange={onInputChange}
            />
          </FloatingLabel>
          <Button
            type="submit"
            className="w-20 ph3 pv2 ml4 f-3"
            variant="outline-light"
            onClick={onButtonSubmit}
          >
            Detect
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ImageLinkForm;
