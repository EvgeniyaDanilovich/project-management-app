import React, { ReactNode } from 'react';
import './Modal.css';
import { resetUpdatedBoardTitle } from '../../redux/boards-slice';
import { useAppDispatch } from '../../hooks/redux';
import { resetUpdatedColumnTitle } from '../../redux/columns-slice';

export interface ModalProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode
}

export const Modal: React.FC<ModalProps> = ({ active, setActive, children }) => {
    const dispatch = useAppDispatch();

    const closeModal = () =>{
        setActive(false);
        dispatch(resetUpdatedBoardTitle());
        dispatch(resetUpdatedColumnTitle());
    }

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={closeModal}>
            <div className={active ? 'modal__content active' : 'modal__content'}
                 onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};
