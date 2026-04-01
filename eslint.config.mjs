import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import preferArrow from 'eslint-plugin-prefer-arrow'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    name: 'jjd/next-img-exceptions',
    files: ['components/ProjectBlock.tsx', 'components/Gallery.tsx'],
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
  {
    name: 'jjd/style-and-conventions',
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
    plugins: {
      'prefer-arrow': preferArrow,
    },
    rules: {
      'max-len': [
        'error',
        {
          code: 120,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
        },
      ],
      'linebreak-style': ['error', 'unix'],
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
      semi: ['error', 'never'],
      'no-trailing-spaces': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'keyword-spacing': 'error',
      'eol-last': ['error', 'always'],
      'prefer-arrow/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],
      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false,
        },
      ],
      'func-style': [
        'error',
        'expression',
        {
          allowArrowFunctions: true,
        },
      ],
      'arrow-parens': ['error', 'always'],
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'react/jsx-max-props-per-line': [
        'error',
        {
          maximum: {
            single: 4,
            multi: 1,
          },
        },
      ],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          alphabetize: {
            order: 'asc',
          },
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*', '../**'],
              message: 'Use the @/ path alias instead of parent-relative imports.',
            },
          ],
        },
      ],
      'object-curly-spacing': ['error', 'always'],
      'no-multi-spaces': 'error',
      'object-property-newline': [
        'error',
        {
          allowAllPropertiesOnSameLine: true,
        },
      ],
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])
