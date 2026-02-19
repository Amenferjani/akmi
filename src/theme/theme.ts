import { createTheme } from '@mantine/core'

export const theme = createTheme({
    colors: {
        blue: [
            '#E6F0FF',
            '#B8D4FF',
            '#8AB8FF',
            '#5C9CFF',
            '#2E80FF',
            '#0064FF',
            '#0050CC',
            '#003C99',
            '#002866',
            '#001433',
        ],

        cyan: [
            '#E6FDFF',
            '#B8F4FF',
            '#8AECFF',
            '#5CE3FF',
            '#2EDBFF',
            '#00D2FF',
            '#00A8CC',
            '#007E99',
            '#005466',
            '#002A33',
        ],

        dark: [
            '#F1F5F9',
            '#E2E8F0',
            '#CBD5E1',
            '#94A3B8',
            '#64748B',
            '#475569',
            '#334155',
            '#1E293B',
            '#0F172A',
            '#0A0A0A',
        ],

        gray: [
            '#FFFFFF',
            '#F8F9FA',
            '#F1F3F5',
            '#E9ECEF',
            '#DEE2E6',
            '#CED4DA',
            '#ADB5BD',
            '#6B7280',
            '#495057',
            '#1A1A1A',
        ],
    },

    primaryColor: 'blue',

    primaryShade: { light: 7, dark: 5 },
})
