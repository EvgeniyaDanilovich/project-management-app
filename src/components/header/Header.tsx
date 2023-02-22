import React from 'react';
import styles from './Header.module.css';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setIsAuth } from '../../redux/auth-slice';
import { removeToken } from '../../utils/localStorage';

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuth } = useAppSelector(state => state.auth);

    const handleLogOut = (): void => {
        dispatch(setIsAuth({ value: false }));
        navigate('/');
        removeToken();
    };

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerRow}>
                    <nav data-testid="navbar" className={styles.navbar}>
                        <NavLink to="/"
                                 className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                     : styles.link}>Welcome
                        </NavLink>
                        {!isAuth ?
                            <div>
                                <NavLink to="/sign-up"
                                         className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                             : styles.link}> Sign up
                                </NavLink>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                        : styles.link}> Sign in
                                </NavLink>
                            </div>
                            // : <div onClick={() => <Navigate to={'/'} />}>Log out</div>
                            : <div>
                                <NavLink
                                    to="/boards"
                                    className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                        : styles.link}> Boards
                                </NavLink>
                                <div onClick={handleLogOut}>Log out</div>
                            </div>
                        }
                    </nav>
                    {/* <div className={styles.loginBlock}> */}
                    {/*     {isAuth ? <div><div>{login}</div><button onClick={logoutTC}>Log out</button></div>  : */}
                    {/*         <NavLink data-testid="main-link" to="/login" */}
                    {/*                  className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}` */}
                    {/*                      : styles.link}> SignUp */}
                    {/*         </NavLink>} */}
                    {/* </div> */}
                </div>
            </div>
        </header>
    );
};
