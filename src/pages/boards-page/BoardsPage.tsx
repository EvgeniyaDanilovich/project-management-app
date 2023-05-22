import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createBoardTC, getAllBoardsByUserIdTC } from '../../redux/boards-slice';
import { Board } from '../../components/board/Board';
import styles from './BoardsPage.module.scss';
import cn from 'classnames';
import { Modal } from '../../components/modal/Modal';
import { CreateForm } from '../../components/createForm/CreateForm';
import { CreateUpdateFormTitles, ItemType } from '../../enums/enums';
import { ICreateUpdateFormValue } from '../../models/forms-interfaces';
import { ButtonWithoutBorder } from '../../ui/buttonWithoutBorder/ButtonWithoutBorder';
import { CardCreate } from '../../ui/cardCreate/CardCreate';
import { getToken } from '../../utils/localStorage';

export const BoardsPage = () => {
    const dispatch = useAppDispatch();

    const [modalActive, setModalActive] = useState<boolean>(false);

    const { boards } = useAppSelector(state => state.boards);
    const userId = useAppSelector(state => state.auth.id);
    // const token = useAppSelector(state => state.auth.token);
    const token = getToken();
    const isAuth = useAppSelector(state => state.auth.isAuth);

    useEffect(() => {
        if (userId) {
                dispatch(getAllBoardsByUserIdTC(userId));
        }
    }, [token]);

    const handleCreateBoard = (data: ICreateUpdateFormValue) => {
        if (userId) {
            dispatch(createBoardTC({ title: data.title, userId }));
        }
    };

    return (
        <div className={cn(styles.boardsWrapper, 'wrapperPadding')}>
            <div className={styles.top}>
                <h3 className={cn(styles.title, 'title30')}>Boards</h3>
                <ButtonWithoutBorder  text={'New board'} setModalActive={setModalActive} />
                <Modal active={modalActive} setActive={setModalActive}>
                    <CreateForm submitAction={handleCreateBoard} closeWindow={setModalActive}
                                title={CreateUpdateFormTitles.CREATE_BOARD}
                                page={ItemType.BOARDS}
                    />
                </Modal>
            </div>

            <div className={styles.boards}>
                {!!boards[0] ?
                    <>
                        {boards.map(board => {
                            return <Board key={board._id} title={board.title} boardId={board._id} />;
                        })}
                    </>
                    : undefined
                }

                <CardCreate text={'create new board' } setModalActive={setModalActive} minVersion={false} />
                <Modal active={modalActive} setActive={setModalActive}>
                    <CreateForm submitAction={handleCreateBoard} closeWindow={setModalActive}
                                title={CreateUpdateFormTitles.CREATE_BOARD}
                                page={ItemType.BOARDS}
                    />
                </Modal>
            </div>

        </div>
    );
};
