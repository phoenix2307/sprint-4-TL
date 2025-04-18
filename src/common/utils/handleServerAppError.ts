import {BaseResponse} from "common/types";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-slice";

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}