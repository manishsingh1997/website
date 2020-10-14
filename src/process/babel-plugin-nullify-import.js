const {declare} = require('@babel/helper-plugin-utils');
const template = require('@babel/template').default;

module.exports = declare(() => {
  return {
    name: 'nullify-import',
    visitor: {
      ImportDeclaration(path, state) {
        const {pathPattern} = state.opts;
        if (pathPattern && (new RegExp(pathPattern)).test(path.node.source.value)) {
          path.replaceWith(
            template.ast`var ${path.node.specifiers[0].local.name} = null;`
          );
        }
      },
    },
  };
});
