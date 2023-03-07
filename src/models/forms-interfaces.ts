import { ICreateUpdateFormValue } from './boards-interfaces';

export interface ISignUpFormValues {
    name: string;
    login: string;
    password: string;
}
export interface ISignInFormValues {
    login: string;
    password: string;
}

export interface CreateUpdateFormProps {
    submitAction: (data: ICreateUpdateFormValue) => void;
    closeWindow: (status: boolean) => void;
    title: string;
    actionType: string,
    page: string
}

export interface DeleteConfirmFormProps {
    submitActions: () => void;
    closeWindow: (status: boolean) => void;
    typeItem: string
}