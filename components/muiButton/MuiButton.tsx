import { Box, Button, ThemeProvider, createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'

const MuiButton = (props: any) => {
    const theme = createTheme({
        palette: {
            primary: {
                main: grey[900],
            },
        },
    })
    let fixedStyle = {}
    if (props.fixed) {
        fixedStyle = {
            position: 'fixed',
            width: 'calc(100% - 40px)',
            bottom: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '40'
        }
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box textAlign='center'>
                    <Button
                        fullWidth
                        style={{
                            height: '50px',
                            width: props.bottomSheet ? '100%' : 'calc(100% - 60px)',
                            maxWidth: '750px',
                            marginTop: '20px',
                            marginBottom: '20px',
                            borderRadius: '20px',
                            color: 'white',
                            fontSize: '16px',
                            fontFamily: 'pretendard',
                            fontWeight: 600,
                            ...props.style,
                            ...fixedStyle
                        }}
                        variant="contained"
                        size="large"
                        color="primary"
                        type="submit"
                        onClick={props.onClick}
                        disabled={props.disabled}
                    >
                        {props.children}
                    </Button>
                </Box>
            </ThemeProvider>
            {props.fixed && (
                <>
                    <div style={{
                        height: '150px',
                        width: 'calc(100% - 35px)',
                        background: 'rgba(255, 255, 255, 0.35)',
                        backdropFilter: 'blur(3px)',
                        position: 'fixed',
                        bottom: 0,
                        maxWidth: '480px',
                        zIndex: '30',
                    }}
                    />
                    <div style={{height: '90px'}}/>

                </>
            )}
        </>
    )
}

export default MuiButton