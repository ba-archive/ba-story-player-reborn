module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    './.eslintrc-auto-import.json',
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "no-console": "off",
    "no-plusplus": "off",
    "no-param-reassign": "off",
    "import/extensions": "off",
    "no-use-before-define": "off",
    "import/no-unresolved": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-underscore-dangle": "off", // 允许使用带有下划线的成员变量, this._foo 表明这是一个私有变量
    "semi": "error",
    "linebreak-style": ["error", "unix"],
    "comma-dangle": [
      "error",
      {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "ignore"
      }
    ],
    "generator-star-spacing": "off",
    "quotes": ["error", "double", { "avoidEscape": true }],
    "space-before-function-paren": ["error", "never"],
    "no-unused-expressions": "off",
    "object-curly-spacing": ["error", "always"],
    "@typescript-eslint/no-unused-vars": "off",
    "arrow-parens": ["error", "always"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off"
  }
}
