import React from "react";

const arrowFunctionOutsideRemainsUntouched = () => {
  return "a" + "b"
}

const Avatars = ({
  borderWidth,
  borderColor,
  shownItemCount,
  showCounter,
  size,
  existingDefPropRemainsUntouched = 20
}) => {
  return (
    <div>{(borderWidth, borderColor, shownItemCount, size, showCounter, existingDefPropRemainsUntouched)}</div>
  );
};

Avatars.defaultProps = {
  borderWidth: 2,
  borderColor: "white",
  shownItemCount: 3,
  size: 32,
  showCounter: false,
};

const AnotherComponent = (props) => <p>Untouched</p>

const AnotherComponentWithPropTypes = ({ value }) => <div>{value}</div>

AnotherComponentWithPropTypes.defaultProps = {
  value: false
}

export default Avatars;
