import React from 'react';
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerRow}>
                    <nav data-testid="navbar" className={styles.navbar}>
                        <NavLink to="/"
                                 className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                     : styles.link}>Main
                        </NavLink>
                        <NavLink
                            to="/messages"
                            className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                : styles.link}> Messages
                        </NavLink>
                        <NavLink
                            to="/sign-up"
                            className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                : styles.link}> Sign up
                        </NavLink>
                        <NavLink
                            to="/login"
                            className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                : styles.link}> Sign in
                        </NavLink>
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
