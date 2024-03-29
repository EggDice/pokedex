module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['deprecation'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        "assertionStyle": "as",
        "objectLiteralTypeAssertions": "allow-as-parameter"
      }
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    'deprecation/deprecation': 'warn',
  },
}
