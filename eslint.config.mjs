import globals from "globals";
import pluginJs from "@eslint/js";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default [
    pluginJs.configs.recommended,
    prettierRecommended,
    {
        ignores: ["node_modules", "Resources/Public/"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
];
