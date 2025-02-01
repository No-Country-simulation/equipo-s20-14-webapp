import PropTypes from "prop-types";

const Card = ({ children, className = ""}) => {
    return <div className={`p-4 border rounded-lg shadow-md ${className}`}>{children}</div>;
};

const CardContent = ({ children }) => {
    return <div>{children}</div>;
};
  
// Definir PropTypes para validar los props
Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };
  
  CardContent.propTypes = {
    children: PropTypes.node.isRequired,
};

export { Card, CardContent };