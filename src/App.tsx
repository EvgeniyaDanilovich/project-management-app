import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { WelcomePage } from './pages/welcome-page/WelcomePage';
import { SignUp } from './pages/sign-up/SignUp';
import { SignIn } from './pages/sign-in/SignIn';
import { BoardsPage } from './pages/boards-page/BoardsPage';
import { getToken, getUserId, setToken } from './utils/localStorage';
import { setIsAuth, setStateUserId, setTokenState } from './redux/auth-slice';
import { useAppDispatch } from './hooks/redux';
import { ColumnsPage } from './pages/colunms-page/ColumnsPage';
import { Footer } from './components/footer/Footer';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const isAuth = getToken();
        isAuth ? dispatch(setIsAuth({ value: true })) : dispatch(setIsAuth({ value: false }));

        if (isAuth) {
            dispatch(setTokenState({ token: isAuth }));
        }

        const userId = getUserId();
        if (userId) {
            dispatch(setStateUserId({ id: userId }));
        }
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<WelcomePage />} />
                    <Route path="login" element={<SignIn />} />
                    <Route path="sign-up" element={<SignUp />} />
                    <Route path="boards" element={<BoardsPage />} />
                    <Route path="board/:boardId" element={<ColumnsPage />} />
                </Route>
                <Route path="*" element={<div>Not found 404</div>} />
            </Routes>
        </div>
    );
}

export default App;
