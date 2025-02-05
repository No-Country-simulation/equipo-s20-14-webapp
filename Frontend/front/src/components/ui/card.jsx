import PropTypes from "prop-types";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`h-36 p-2 border rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between ">
      {children}
    </div>
  );
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
