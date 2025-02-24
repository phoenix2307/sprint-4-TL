import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import {useAppDispatch, useAppSelector} from 'common/hooks'
import {getTheme} from 'common/theme'
import {selectThemeMode} from '../../../../app/appSelectors'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import s from './Login.module.css'
import {loginTC} from "../../model/auth-reducer";
import {selectIsLoggedIn} from "../../model/authSelector";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {Path} from "common/routing/Routing";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "../../lib/shemas";
import {Inputs} from "../../lib/shemas/loginSchema";


export const Login = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const navigate = useNavigate()


    useEffect( () => {
        if (isLoggedIn){
            navigate(Path.Main)
        }
    }, [isLoggedIn] )

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors},
    } = useForm<Inputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: {email: 'phoenix.trade2307@gmail.com', password: 'ph23', rememberMe: false}})


    const dispatch = useAppDispatch()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(loginTC(data))
        reset()
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To login get registered
                            <a
                                style={{color: theme.palette.primary.main, marginLeft: '5px'}}
                                href={'https://social-network.samuraijs.com/'}
                                target={'_blank'}
                                rel="noreferrer"
                            >
                                here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>
                            <b>Email:</b> free@samuraijs.com
                        </p>
                        <p>
                            <b>Password:</b> free
                        </p>
                    </FormLabel>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                        {/*    <TextField label="Email" margin="normal"
                                       {...register('email', {
                                           required: 'Email is required',
                                           pattern: {
                                               value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                               message: 'Incorrect email address',
                                           },
                                       })}/>*/}
                            <TextField label="Email" margin="normal" error={!!errors.email} {...register("email")} />
                            {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
                     {/*       <TextField type="password" label="Password" margin="normal" {...register('password', {
                                required: 'Password is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: ' Incorrect password'
                                }
                            })}/>*/}
                            <TextField type="password" label="Password" margin="normal" error={!!errors.password}{...register('password', )}/>
                            {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Controller
                                        control={control}
                                        render={({field: {value, onChange}}) => {
                                            return (<Checkbox
                                                onChange={e => onChange(e.currentTarget.checked)}
                                                checked={value}/>)
                                        }}
                                        name={'rememberMe'}/>
                                }
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Grid>
        </Grid>
    )
}