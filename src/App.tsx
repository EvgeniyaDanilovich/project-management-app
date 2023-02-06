import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { MainPage } from './pages/main-page/MainPage';
import { Login } from './components/login/Login';
import { SignUp } from './components/sign-up/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              {/* <Route path="main/:userId" element={ */}
              {/*     // @ts-ignore */}
              {/*     <MainPageContainer />} /> */}
              <Route path="login" element={<Login />} />
              <Route path="sign-up" element={<SignUp />} />
              {/* <Route path="login" element={<SignUp />} /> */}
              {/* <Route path="chat" element={<ChatPage />} /> */}
          </Route>
          <Route path="*" element={<div>Not found 404</div>} />
      </Routes>
    </div>
  );
}

export default App;
