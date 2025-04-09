import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import React, {useEffect} from "react"
import {changeThemeAC} from "../../../app/app-slice"
import {selectAppStatus, selectThemeMode} from "../../../app/appSelectors"
import {useAppDispatch, useAppSelector} from "common/hooks"
import {getTheme} from "common/theme"
import {MenuButton} from "common/components"
import {LinearProgress} from "@mui/material";
import {selectIsLoggedIn} from "../../../features/auth/model/authSelector";
import {logoutTC} from "../../../features/auth/model/auth-reducer";
import {useNavigate} from "react-router";
import {Path} from "common/routing/Routing";

export const Header = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const navigate = useNavigate()

    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const status = useAppSelector(selectAppStatus)

    useEffect(()=>{
        if (!isLoggedIn){
        navigate(Path.Login)
        }
    }, [isLoggedIn])

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"))
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <AppBar position="static" sx={{mb: "30px"}}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <div>
                    {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}

                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={"default"} onChange={changeModeHandler}/>
                </div>
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}

        </AppBar>
    )
}
