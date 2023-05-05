import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignInFormValues } from '../../models/forms-interfaces';
import { singInTC } from '../../redux/auth-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Navigate, NavLink } from 'react-router-dom';
import { ButtonBorder } from '../../ui/buttonBorder/ButtonBorder';
import styles from './SignIn.module.scss'
import cn from 'classnames';

export const SignIn: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isAuth } = useAppSelector((state) => state.auth);
    console.log(isAuth);

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<ISignInFormValues>({
        mode: 'onChange'
    });

    if (isAuth) return <Navigate to="/boards" />;

    const onSubmit: SubmitHandler<ISignInFormValues> = (data) => {
        dispatch(singInTC(data));
    };

    return (
        <div className={styles.signInPage}>
            <h3 className={cn(styles.signInTitle ,'title30')}>Welcome back</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={'inputBox'}>
                    <input type={'text'} {...register('login', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} placeholder={'Email'}  className={'input'}/>
                    {errors?.login && <p className={'errorText'} >{errors?.login.message}</p>}
                </div>
                <div className={'inputBox'}>
                    <input type={'password'} {...register('password', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} placeholder={'Password'} className={'input'} />
                    {errors?.password && <p className={'errorText'}>{errors?.password.message}</p>}
                </div>

                <div>
                    <ButtonBorder text={'Sign in'} isValid={isValid} />
                    {/* <button disabled={!isValid}>Sign in</button> */}
                </div>

                <div className={cn(styles.textAsk,'text14')}>
                    No account?
                    <NavLink to="/sign-up" className={'link'}> Sign up</NavLink>
                </div>
            </form>
        </div>
    );
};
