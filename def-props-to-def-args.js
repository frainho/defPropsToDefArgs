module.exports = function (fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  root.find(j.VariableDeclaration).forEach((path) => {
    const componentName = getReactComponentName(path);
    if (!componentName) {
      return;
    }
    const defaultProps = getDefaultPropsForComponent(root, j, componentName);
    if (!defaultProps) {
      return;
    }
    const defaultPropsValues = extractValuesFromPropTypes(j, defaultProps);
    assignPropsValues(path, j, defaultPropsValues);
    
    j(defaultProps).remove();
  });

  return root.toSource();
};

const getReactComponentName = (path) => {
  const firstLetterOfDeclaration = path.node.declarations[0].id.name[0];
  const firstLetterIsUppercase =
    firstLetterOfDeclaration === firstLetterOfDeclaration.toUpperCase();
  const isArrowFunction =
    path.node.declarations[0].init.type === "ArrowFunctionExpression";
  if (isArrowFunction && firstLetterIsUppercase) {
    return path.node.declarations[0].id.name;
  }
};

const getDefaultPropsForComponent = (root, j, componentName) => {
  const collection = root.find(j.ExpressionStatement);
  if (!collection.length) {
    return
  }

  let defaultPropsPath;
  collection.forEach((path) => {
    const isComponentName =
      path.value.expression.left.object.name === componentName;
    const isDefaultProps =
      path.value.expression.left.property.name === "defaultProps";
    if (isComponentName && isDefaultProps) {
      defaultPropsPath = path;
    }
  });

  return defaultPropsPath
};

const extractValuesFromPropTypes = (j, path) => {
  const properties = {};
  j(path).find(j.Property).forEach(property => {
    properties[property.value.key.name] = property.value.value;
  })
  return properties;
};

const assignPropsValues = (path, j, defaultPropsValues) => {
  j(path)
    .find(j.Property)
    .forEach((property) => {
      if (defaultPropsValues[property.value.key.name]) {
        const newPropertyValue = defaultPropsValues[property.value.key.name];
        j(property).replaceWith(
          j.objectProperty(
            property.value.key,
            j.assignmentPattern(property.value.key, newPropertyValue)
          )
        );
        property.value.shorthand = true;
      }
    });
};
