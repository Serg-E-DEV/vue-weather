import vue from 'eslint-plugin-vue';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    ...vue.configs['flat/recommended'],
    prettier,
    {
        files: ['**/*.vue', '**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                process: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
            },
        },
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/require-default-prop': 'off',
            'no-unused-vars': 'error',
        },
    },
    {
        files: ['vite.config.*', 'eslint.config.*', '*.cjs', '*.mjs'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
                process: 'readonly',
            },
        },
    },
];
