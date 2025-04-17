import 'tailwindcss/tailwind'

declare module 'tailwindcss/tailwind' {
    interface DefaultColors {
        accent?: {
            DEFAULT?: string
            dark?: string
        }
    }
}
