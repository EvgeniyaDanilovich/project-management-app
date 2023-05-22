import React from 'react';
import styles from './ButtonWithoutBorder.module.scss';
import { ReactComponent as Plus } from '../../assets/images/plus.svg';

export interface ButtonWithoutBorderProps{
    text: string;
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const ButtonWithoutBorder: React.FC<ButtonWithoutBorderProps> = ({text, setModalActive}) => {
    return (
        <div className={styles.createBtn} onClick={() => setModalActive(true)}>
            <Plus className={styles.plusMin} />
            {text}
        </div>
    );
};