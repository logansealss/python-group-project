import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import tmLogoWhite from '../../img/tm-logo-white.png';
import quotes from '../../data/quotes.json'

import './login.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [renderErrors, setRenderErrors] = useState(false);
    const [backendErrors, setBackendErrors] = useState([]);
    const [errCount, setErrCount] = useState();

    //individual field error states
    const [credentialErr, setCredentialErr] = useState('');
    const [passErr, setPassErr] = useState('');

    //individual pseudo-input error classes
    const [crErrClass, setCrErrClass] = useState('li-hasError');
    const [pwErrClass, setPwErrClass] = useState('li-hasError');

    function randomizeQuote() {
        const randInt = Math.ceil(Math.random() * Object.keys(quotes).length)
        quote = quotes[`${randInt}`].quote
        author = quotes[`${randInt}`].author
    }


    let quote;
    let author;

    randomizeQuote();

    // useEffect(() => {
    //     randomizeQuote();
    // },[quote, author])

    useEffect(() => {

        if (credential.length <= 3) {
            setCredentialErr('Username or email is required');
            renderErrors ? setCrErrClass('li-hasError') : setCrErrClass('li-valid');
        } else {
            setCredentialErr('');
            setCrErrClass('li-valid')
        }
        if (!password.length) {
            setPassErr('Password is required');
            renderErrors ? setPwErrClass('li-hasError') : setPwErrClass('li-valid');
        } else if (password.length && password.length < 6) {
            setPassErr('passwords must be at least 6 characters');
            renderErrors ? setPwErrClass('li-hasError') : setPwErrClass('li-valid');
        } else {
            setPassErr('');
            setPwErrClass('li-valid')
        }

    }, [
        credential,
        password,
        renderErrors
    ]);

    if (sessionUser) return <Redirect to="/" />;

    const demoUserBtnClick = (e) => {
        setPassErr('');
        setCredentialErr('');
        setCredential('demo@aa.io');
        setPassword('password');
    }

    const emailCheck = (str) => {
        return /\S+@\S+\.\S+/.test(str);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setBackendErrors([]);
        setRenderErrors(true);

        if (!credentialErr &&
            !passErr
        ) {
            return dispatch(sessionActions.login(credential, password))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setBackendErrors(data.errors);
                });
        }
    };

    const formatBackendErrors = (errorObj) => {
        const errs = [];
        for (let key in errorObj) {
            errs.push(errorObj[key]);
        }
        return errs;
    }

    return (
        <div className="li-main-page-div">
            <div className="li-left-pane-main">
                <Link to='/'>
                    <img className="li-left-main-logo" src={tmLogoWhite} />
                </Link>
                <div className="li-left-pane-content">
                    <p className="li-left-pane-content-quote">
                        "{quote}"
                    </p>
                    <p className="li-left-pane-content-author">-{author}</p>
                </div>
            </div>
            <div className="li-right-pane-main">
                <div className="li-signup-btn-div">
                    <Link to='/signup'>
                        <button className="li-signup-btn">Sign up for free</button>
                    </Link>
                </div>

                <div className="li-title-div">
                    Been here before? Welcome back!
                </div>
                <div className="li-login-err-div">
                    {formatBackendErrors(backendErrors).map((error, idx) => (
                        <div className="li-err-msg" key={idx}>{error}</div>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="li-form-main-div">
                        <div className="li-input-div">
                            <div className="li-input-inner-div">
                                <div className="li-input-label-div">
                                    <div className="li-field-error">
                                        {renderErrors && credentialErr.length > 0 && credentialErr}
                                    </div>
                                </div>
                                <div className={`li-pseudo-input ${crErrClass}`}>
                                    <input
                                        placeholder="Email or Username"
                                        className="li-input-field"
                                        type="text"
                                        value={credential}
                                        onChange={(e) => setCredential(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="li-input-div">
                            <div className="li-input-inner-div">
                                <div className="li-input-label-div">
                                    <div className="li-field-error">
                                        {renderErrors && passErr.length > 0 && passErr}
                                    </div>
                                </div>
                                <div className={`li-pseudo-input ${pwErrClass}`}>
                                    <input
                                        placeholder="Password"
                                        className="li-input-field"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="li-login-btn-div">
                            <button
                                className="li-login-btn"
                                type="submit"
                            >
                                Log in
                            </button>
                            <button
                                className="li-login-btn"
                                type="submit"
                                onClick={demoUserBtnClick}
                            >
                                Demo user log in
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginFormPage;
