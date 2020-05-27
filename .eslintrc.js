module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'require-jsdoc': 'off',
    'no-invalid-this': 'off',
    'comma-dangle': 'off',
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/ban-ts-ignore': 'off',
    'react/display-name': 'off',
    'max-len': ['error', { 'code': 100 }],
    'arrow-body-style': ['warn', 'as-needed'],
    '@typescript-eslint/camelcase': 'warn',
    'arrow-parens': ['error', 'as-needed', { 'requireForBlockBody': true }]
  }
};
