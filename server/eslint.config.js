export default [
    {
        files : ["**/*.js"], //only check .js files in server dir
        rules : {
            semi: "error",
            'no-unused-vars': 'warn' //warn if unused vars.
        },
    },
];