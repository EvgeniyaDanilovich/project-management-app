import React, { ReactNode } from 'react';
import './Modal.css';
import { resetCurrentBoardTitle } from '../../redux/boards-slice';
import { useAppDispatch } from '../../hooks/redux';

export interface ModalProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode
}

export const Modal: React.FC<ModalProps> = ({ active, setActive, children }) => {
    const dispatch = useAppDispatch();

    const closeModal = () =>{
        setActive(false);
        dispatch(resetCurrentBoardTitle());
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
