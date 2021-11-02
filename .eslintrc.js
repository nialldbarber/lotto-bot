module.exports = {
  root: true,
  extends: ['plugin:import/typescript'],
  plugins: ['import'],
  parser: '@babel/eslint-parser',
  rules: {
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'block-scoped-var': 'error',
    'func-names': 0,
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-duplicates': 2,
    'import/prefer-default-export': 0,
    'import/no-unused-modules': 0,
  },
};
