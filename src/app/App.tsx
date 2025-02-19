import CssBaseline from "@mui/material/CssBaseline"
import {ThemeProvider} from "@mui/material/styles"
import React, {useEffect} from "react"
import {ErrorSnackBar, Header} from "common/components"
import {useAppDispatch, useAppSelector} from "common/hooks"
import {getTheme} from "common/theme"
import {selectThemeMode} from "./appSelectors"
import {Routing} from "common/routing";
import {initializeAppTC} from "../features/auth/model/auth-reducer";
import {selectIsInitialized} from "../features/auth/model/authSelector";
import s from './App.module.css'
import CircularProgress from '@mui/material/CircularProgress';

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const isInitialized = useAppSelector(selectIsInitialized)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized){
        return (
            <div className={s.circularProgressContainer}>
                <CircularProgress size={150} thickness={3}/>
            </div>
        )
    }

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            <Header/>
            <Routing/>
            <ErrorSnackBar/>
        </ThemeProvider>
    )
}
