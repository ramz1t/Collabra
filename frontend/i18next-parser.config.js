export default {
    input: ['src/**/*.{ts,tsx}'],
    output: './public/locales/$LOCALE/translation.json',
    locales: ['en', 'ru', 'se'],
    defaultNamespace: 'translation',
    defaultValue: '',
}
