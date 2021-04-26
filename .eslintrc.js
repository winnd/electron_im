// eslint-disable-next-line no-undef
module.exports = {
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
    ],
    rules  : {
        // https://eslint.vuejs.org/rules/
        'vue/no-unused-vars'                        : 'error',
        'vue/no-unused-components'                  : 0,
        'vue/multiline-html-element-content-newline': 0,
        'vue/max-attributes-per-line'               : ['error', {
            'singleline': {'max': 10},
            'multiline' : {'max': 10}
        }]
    }
}
