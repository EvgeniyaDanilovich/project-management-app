import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { MainPage } from './pages/main-page/MainPage';
import { SignUp } from './components/sign-up/SignUp';
import { SignIn } from './pages/sign-in/SignIn';

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTY3MzhlZmU4ZDUxMzZmY2ZlZDBlZSIsImxvZ2luIjoiZXZnZW5peWFkYW5pbG92aWNoQGdtYWlsLmNvbSIsImlhdCI6MTY3NjA1ODAxOCwiZXhwIjoxNjc2MTAxMjE4fQ.SrVpldWXD1rr2pFQhGwNigWJ4eZf99zV6-0S66qzvNE

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              {/* <Route path="main/:userId" element={ */}
              {/*     // @ts-ignore */}
              {/*     <MainPageContainer />} /> */}
              <Route path="login" element={<SignIn />} />
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
