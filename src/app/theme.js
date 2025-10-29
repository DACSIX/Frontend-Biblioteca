import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1e88e5' },
        secondary: { main: '#8e24aa' },
    },
    components: {
        MuiButton: { defaultProps: { variant: 'contained' } },
    },
})