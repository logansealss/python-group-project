import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginFormPage from './components/auth/LoginFormPage/login';
import SignupFormPage from './components/auth/SignupFormPage/signup';
import Navi from './components/Navi/navi';
// import BotNavi from './components/BotNavi/botNavi';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Splash from './components/Splash/splash';
import UsersList from './components/UsersList';
import User from './components/User';
import TaskAppNav from './components/TaskApp/taskAppNav';
import TaskApp from './components/TaskApp/taskApp';
import { authenticate } from './store/session';

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact={true} >
                    <Navi loaded={loaded} />
                    <Splash />
                </Route>
                <Route path='/login' exact={true}>
                    <LoginFormPage />
                </Route>
                <Route path='/signup' exact={true}>
                    <SignupFormPage />
                </Route>
                <Route path='/app'>
                    <TaskApp/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
