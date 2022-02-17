module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
        //"plugin:prettier/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "CKEDITOR": false,
        "ActiveXObject": false,
        "_": false,
        "$": false,
        "jQuery": false,
        "renderIframe": false,
        "jsPDF": false
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        //"prettier/prettier": [
        //    "error",
        //    {
        //        "arrowParens": "avoid",
        //        "trailingComma": "none",
        //        "singleQuote": true,
        //        "tabWidth": 4
        //    }
        //]
    },
    parserOptions: {
        "parser": "babel-eslint",
        "ecmaVersion": 2018,
        sourceType: "module",
        allowImportExportEverywhere: true
    }
};