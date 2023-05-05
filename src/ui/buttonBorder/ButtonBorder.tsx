import React from 'react';
import styles from './ButtonBorder.module.scss'

export interface ButtonBorderProps{
    text: string;
    isValid: boolean;
}

export const ButtonBorder: React.FC<ButtonBorderProps> = ({text,isValid}) => {
    return (
        <button className={styles.borderButton} disabled={!isValid}>{text}</button>
    );
};
