import * as React from 'react';
import {SyntheticEvent} from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "common/hooks";
import {selectAppError} from "../../../app/appSelectors";
import {setAppErrorAC} from "../../../app/app-slice";

export const ErrorSnackBar = () => {
    const error = useAppSelector(selectAppError)
    const dispatch = useAppDispatch()

    const handleClose = (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
    }

    return (
        <div>
            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}
