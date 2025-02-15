import CssBaseline from "@mui/material/CssBaseline"
import {ThemeProvider} from "@mui/material/styles"
import React from "react"
import {ErrorSnackBar, Header} from "common/components"
import {useAppSelector} from "common/hooks"
import {getTheme} from "common/theme"
import {selectThemeMode} from "./appSelectors"
import {Routing} from "common/routing";

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            <Header/>
            <Routing/>
            <ErrorSnackBar/>
        </ThemeProvider>
    )
}
