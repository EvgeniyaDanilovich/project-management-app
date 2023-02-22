import React, { ReactNode } from 'react';
import './Modal.css';

export interface ModalProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode
}

export const Modal: React.FC<ModalProps> = ({ active, setActive, children }) => {

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modal__content active' : 'modal__content'} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};
