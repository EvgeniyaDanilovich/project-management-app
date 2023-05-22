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
    page: string
}

export interface ICreateUpdateFormValue {
    title: string;
    description?: string
}

export interface DeleteConfirmFormProps {
    submitActions: () => void;
    closeWindow: (status: boolean) => void;
    typeItem: string
}