import React from "react";

const arrowFunctionOutsideRemainsUntouched = () => {
  return "a" + "b"
}

const Avatars = ({
  borderWidth = 2,
  borderColor = "white",
  shownItemCount = 3,
  showCounter = false,
  size = 32,
  existingDefPropRemainsUntouched = 20
}) => {
  return (
    <div>{(borderWidth, borderColor, shownItemCount, size, showCounter, existingDefPropRemainsUntouched)}</div>
  );
};

const AnotherComponent = (props) => <p>Untouched</p>

const AnotherComponentWithPropTypes = ({
  value = false
}) => <div>{value}</div>

export default Avatars;
