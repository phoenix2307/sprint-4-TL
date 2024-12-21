import CssBaseline from "@mui/material/CssBaseline"
import {ThemeProvider} from "@mui/material/styles"
import React from "react"
import {ErrorSnackBar, Header} from "common/components"
import {useAppSelector} from "common/hooks"
import {getTheme} from "common/theme"
import {selectThemeMode} from "./appSelectors"
import {Main} from "./Main"

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)

// ======================================================================
    function updateArray<T>(array: T[], element: T) {
        if (!array.includes(element)) {
            return [...array, element]
        } else {
            return [...array]
        }
        // code
        // for (let i = 0; i < array.length; i++) {
        //     if(array !== element ) {
        //
        //     } else {
        //
        //     }
        // }
    }


// Строки
    const stringArray = ['apple', 'banana', 'cherry']
    const result1 = updateArray(stringArray, 'banana') // ['apple', 'banana', 'cherry']
    console.log(result1)
    const result2 = updateArray(stringArray, 'date') // ['apple', 'banana', 'cherry', 'date']
    console.log(result2)

// Числа
    const numberArray = [1, 2, 3]
    const result3 = updateArray(numberArray, 2) // [1, 2, 3]
    console.log(result3)
    const result4 = updateArray(numberArray, 4) // [1, 2, 3, 4]
    console.log(result4)
// ===========================================================================
    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            <Header/>
            <Main/>
            <ErrorSnackBar/>
        </ThemeProvider>
    )
}
