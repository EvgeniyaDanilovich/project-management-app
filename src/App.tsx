import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { WelcomePage } from './pages/welcome-page/WelcomePage';
import { SignUp } from './pages/sign-up/SignUp';
import { SignIn } from './pages/sign-in/SignIn';
import { BoardsPage } from './pages/boards-page/BoardsPage';
import { getToken, getUserId } from './utils/localStorage';
import { setIsAuth, setStateUserId } from './redux/auth-slice';
import { useAppDispatch } from './hooks/redux';
import { BoardPage } from './pages/board-page/BoardPage';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const isAuth = getToken();
        isAuth ? dispatch(setIsAuth({ value: true })) : dispatch(setIsAuth({ value: false }));

        const userId = getUserId();
        if(userId){
            dispatch(setStateUserId({ id: userId }))
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
                    <Route path="board/:boardId" element={<BoardPage />} />
                </Route>
                <Route path="*" element={<div>Not found 404</div>} />
            </Routes>
        </div>
    );
}

export default App;
