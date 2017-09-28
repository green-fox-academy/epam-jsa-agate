module.exports = {
  'extends': 'google',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
  },
  'env': {
    'es6': true,
  },
  'rules': {
    'require-jsdoc': 0,
    'react/jsx-uses-vars': 2,
    'react/jsx-uses-react': 2,
  },
  'plugins': [
    'react',
  ],
};
