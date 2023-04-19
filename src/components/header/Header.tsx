import React, { useState } from 'react';
import styles from './Header.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resetUserData, setIsAuth, setStateUserId, setTokenState } from '../../redux/auth-slice';
import { getToken, getUserId, removeToken } from '../../utils/localStorage';
import { Modal } from '../modal/Modal';
import { CreateForm } from '../createUpdateForm/CreateForm';
import { createBoardTC } from '../../redux/boards-slice';
import { CreateUpdateFormTitles, ItemType } from '../../enums/enums';
import { ICreateUpdateFormValue } from '../../models/forms-interfaces';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';

// className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}` : styles.link}
//({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
//                                         : styles.link

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [modalActive, setModalActive] = useState<boolean>(false);

    const { isAuth } = useAppSelector(state => state.auth);
    const userId = useAppSelector(state => state.auth.id);

    const handleLogOut = (): void => {
        dispatch(setIsAuth({ value: false }));
        dispatch(resetUserData());
        navigate('/');
        removeToken();
    };

    const onSignIn = () => {
        const token = getToken();
        const id = getUserId();

        if (token) {
            dispatch(setTokenState({ token }));
        }
        if (userId) {
            dispatch(setStateUserId({ id }));
        }
    };

    const handleCreateBoard = (data: ICreateUpdateFormValue) => {
        if (userId) {
            dispatch(createBoardTC({ title: data.title, userId }));
        }
    };

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerRow}>
                    <nav data-testid="navbar" className={styles.navbar}>
                        <NavLink to="/"
                                 className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                     : styles.link}><Logo />
                        </NavLink>
                        {!isAuth ?
                            <div>
                                <NavLink
                                    to="/login" onClick={onSignIn}
                                    className={styles.auth_btn}> Sign in
                                </NavLink>
                                <NavLink to="/sign-up" className={`${styles.auth_btn} ${styles.auth_btn__b}`} >
                                    Sign up
                                </NavLink>
                            </div>
                            // : <div onClick={() => <Navigate to={'/'} />}>Log out</div>
                            : <div className={styles.subRow}>
                                <NavLink
                                    to="/boards"
                                    className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                        : styles.link}> Boards
                                </NavLink>
                                <div onClick={() => setModalActive(true)}> Create new board</div>
                                <Modal active={modalActive} setActive={setModalActive}>
                                    <CreateForm submitAction={handleCreateBoard} closeWindow={setModalActive}
                                                title={CreateUpdateFormTitles.CREATE_BOARD}
                                                page={ItemType.BOARDS}
                                    />
                                </Modal>
                                {/* <div onClick={() => console.log('lang')}>en / ru</div> */}
                                {/* <NavLink */}
                                {/*     to="/" */}
                                {/*     className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}` */}
                                {/*         : styles.link}> Edit profile */}
                                {/* </NavLink> */}
                                <div onClick={handleLogOut}>Log out</div>
                            </div>
                        }
                    </nav>
                </div>
            </div>
        </header>
    );
};
