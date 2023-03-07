import React, { useState } from 'react';
import styles from './Header.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setIsAuth } from '../../redux/auth-slice';
import { removeToken } from '../../utils/localStorage';
import { Modal } from '../modal/Modal';
import { CreateUpdateForm } from '../createUpdateForm/CreateUpdateForm';
import { createBoardTC } from '../../redux/boards-slice';
import { ICreateUpdateFormValue } from '../../models/boards-interfaces';
import { CreateUpdateFormAction, CreateUpdateFormTitles, ItemType } from '../../enums/enums';

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [modalActive, setModalActive] = useState<boolean>(false);

    const { isAuth } = useAppSelector(state => state.auth);
    const userId = useAppSelector(state => state.auth.id);

    const handleLogOut = (): void => {
        dispatch(setIsAuth({ value: false }));
        navigate('/');
        removeToken();
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
                            : <div className={styles.subRow}>
                                <NavLink
                                    to="/boards"
                                    className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                        : styles.link}> Boards
                                </NavLink>
                                <div onClick={() => setModalActive(true)}> Create new board</div>
                                <Modal active={modalActive} setActive={setModalActive}>
                                    <CreateUpdateForm submitAction={handleCreateBoard} closeWindow={setModalActive}
                                                      title={CreateUpdateFormTitles.CREATE_BOARD}
                                                      actionType={CreateUpdateFormAction.CREATE}
                                                      page={ItemType.BOARDS}
                                    />
                                </Modal>
                                <div onClick={() => console.log('lang')}>en / ru</div>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                        : styles.link}> Edit profile
                                </NavLink>
                                <div onClick={handleLogOut}>Log out</div>
                            </div>
                        }
                    </nav>
                </div>
            </div>
        </header>
    );
};
