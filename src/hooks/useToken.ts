export const useToken = () => {
    const getToken = () => {
        const userToken = localStorage.getItem('token');
        console.log(userToken);
        return userToken;
    };

    const setToken = (token: string) => {
        localStorage.setItem('token', token);
    };
    return {
        token: getToken,
        setToken };
};