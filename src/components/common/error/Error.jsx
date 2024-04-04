import { PropTypes } from "prop-types";
import "./Error.scss";

const Error = ({ message }) => {
  return (
    <div className="error-container">
      <h3 className="error-heading-text" >Error!!</h3>
      <p className="error-message">{message}</p>
    </div>
  );
};

export default Error;

Error.propTypes = {
  message: PropTypes.string
};