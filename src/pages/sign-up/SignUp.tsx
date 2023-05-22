import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignUpFormValues } from '../../models/forms-interfaces';
import { useAppDispatch } from '../../hooks/redux';
import { singUpTC } from '../../redux/auth-slice';
import { NavLink } from 'react-router-dom';
import { ButtonBorder } from '../../ui/buttonBorder/ButtonBorder';
import cn from 'classnames';
import styles from '../sign-in/SignIn.module.scss'

export const SignUp: React.FC = () => {
    const dispatch = useAppDispatch();

    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<ISignUpFormValues>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<ISignUpFormValues> = (data) => {
        dispatch(singUpTC(data));
        reset();
    };

    return (
        <div className={styles.signInPage}>
            <h3 className={cn(styles.signInTitle ,'title30')}>Create new account</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={'inputBox'}>
                    <input type={'text'} {...register('name', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} placeholder={'Name'} className={'input'} />
                    {errors?.name && <p>{errors?.name.message}</p>}
                </div>
                <div className={'inputBox'}>
                    <input type={'text'} {...register('login', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} placeholder={'Email'} className={'input'} />
                    {errors?.login && <p>{errors?.login.message}</p>}
                </div>
                <div className={'inputBox'}>
                    <input type={'password'} {...register('password', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} placeholder={'Password'} className={'input'} />
                    {errors?.password && <p>{errors?.password.message}</p>}
                </div>

                <div>
                    <ButtonBorder text={'Sign up'} isValid={isValid} />
                </div>

                <div className={cn(styles.textAsk,'text14')}>
                    Already with us?
                    <NavLink to="/login" className={'link'}> Sign in</NavLink>
                </div>
            </form>
        </div>
    );
};
