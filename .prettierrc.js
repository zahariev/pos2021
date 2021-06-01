module.exports = {
    trailingComma: 'all',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    bracketSpacing: true,
    printWidth: 100,
    endOfLine: 'crlf',
    overrides: [
        {
            files: '*.html',
            options: {
                parser: 'angular',
            },
        },
        {
            files: '*.html',
            options: {
                parser: 'html',
            },
        },
    ],
};
