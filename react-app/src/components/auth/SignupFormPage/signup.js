import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import tmLogoWhite from '../../../img/tm-logo-white.png';
import person1 from '../../../img/hp_person2.png';
import person2 from '../../../img/hp_person3.png';
import person3 from '../../../img/hp_person4.png';
import './signup.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [renderErrors, setRenderErrors] = useState(false);
    const [backendErrors, setBackendErrors] = useState([]);

    //individual field error states
    const [emailErr, setEmailErr] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [firstNameErr, setFirstNameErr] = useState('');
    const [lastNameErr, setLastNameErr] = useState('');
    const [passErr, setPassErr] = useState('');
    const [confPassErr, setConfPassErr] = useState('');

    //individual pseudo-input error classes
    const [fnErrClass, setFnErrClass] = useState('su-hasError');
    const [lnErrClass, setLnErrClass] = useState('su-hasError');
    const [emErrClass, setEmErrClass] = useState('su-hasError');
    const [unErrClass, setUnErrClass] = useState('su-hasError');
    const [pwErrClass, setPwErrClass] = useState('su-hasError');
    const [cpErrClass, setCpErrClass] = useState('su-hasError');

    useEffect(() => {

        if (!email.length || !emailCheck(email)) {
            setEmailErr('Please enter a valid email');
            renderErrors ? setEmErrClass('su-hasError') : setEmErrClass('su-valid');
        } else {
            setEmailErr('');
            setEmErrClass('su-valid')
        }
        if (username.length <= 3) {
            setUsernameErr('Mininum 4 characters');
            renderErrors ? setUnErrClass('su-hasError') : setUnErrClass('su-valid');
        } else {
            setUsernameErr('');
            setUnErrClass('su-valid')
        }
        if (!firstName.length) {
            setFirstNameErr('First name is required');
            renderErrors ? setFnErrClass('su-hasError') : setFnErrClass('su-valid');
        } else {
            setFirstNameErr('');
            setFnErrClass('su-valid');
        }
        if (!lastName.length) {
            setLastNameErr('Last name required');
            renderErrors ? setLnErrClass('su-hasError') : setLnErrClass('su-valid');
        } else {
            setLastNameErr('');
            setLnErrClass('su-valid')
        }
        if (!password.length) {
            setPassErr('Password is required');
            renderErrors ? setPwErrClass('su-hasError') : setPwErrClass('su-valid');
        } else if (password.length && password.length < 6) {
            setPassErr('passwords must be at least 6 characters');
            renderErrors ? setPwErrClass('su-hasError') : setPwErrClass('su-valid');
        } else {
            setPassErr('');
            setPwErrClass('su-valid')
        }
        if (!confirmPassword || !(confirmPassword === password)) {
            setConfPassErr('Passwords do not match');
            renderErrors ? setCpErrClass('su-hasError') : setCpErrClass('su-valid');
        } else {
            setConfPassErr('');
            setCpErrClass('su-valid')
        }
    }, [
        username,
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
        renderErrors
    ]);

    if (sessionUser) return <Redirect to="/" />;

    const emailCheck = (str) => {
        return /\S+@\S+\.\S+/.test(str);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setBackendErrors([]);
        setRenderErrors(true);

        if (!usernameErr &&
            !emailErr &&
            !firstNameErr &&
            !lastNameErr &&
            !passErr &&
            !confPassErr
        ) {
            return dispatch(sessionActions.signup(
                firstName, lastName, username, email, password
                ))
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
        <div className="su-main-page-div">
            <div className="su-left-pane-main">
                <Link to='/'>
                <img alt='' className="su-left-main-logo" src={tmLogoWhite} />
                </Link>
                <div className="su-left-pane-content">
                    <div className="su-left-pane-imgs">
                        <div className="su-lp-img-div su-p2">
                            <img alt='' className="su-lp-img" src={person2} />
                        </div>
                        <div className="su-lp-img-div su-p1">
                            <img alt='' className="su-lp-img" src={person1} />
                        </div>
                        <div className="su-lp-img-div su-p3">
                            <img alt='' className="su-lp-img" src={person3} />
                        </div>
                    </div>
                    <p className="su-left-pane-content-p">
                        Join millions of people getting
                        {' '}more organized and productive!
                    </p>
                </div>
            </div>
            <div className="su-right-pane-main">
                <div className="su-login-btn-div">
                    <Link to='/login'>
                        <button className="su-login-btn">Log in</button>
                    </Link>
                </div>

                <div className="su-title-div">
                    Sign up for free.
                </div>
                <div className="su-login-err-div">
                    {formatBackendErrors(backendErrors).map((error, idx) => (
                        <div className="su-err-msg" key={idx}>{error}</div>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="su-form-main-div">
                        <div className="su-input-div">
                            <div className="su-input-inner-div">
                                <div className="su-input-label-div">
                                    <div className="su-field-error">
                                        {renderErrors && firstNameErr.length > 0 && firstNameErr}
                                    </div>
                                </div>
                                <div className={`su-pseudo-input ${fnErrClass}`}>
                                    <input
                                        placeholder="First Name"
                                        className="su-input-field"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="su-input-div">
                            <div className="su-input-inner-div">
                                <div className="su-input-label-div">
                                    <div className="su-field-error">
                                        {renderErrors && lastNameErr.length > 0 && lastNameErr}
                                    </div>
                                </div>
                                <div className={`su-pseudo-input ${lnErrClass}`}>
                                    <input
                                        placeholder="Last Name"
                                        className="su-input-field"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="su-input-div">
                            <div className="su-input-inner-div">
                                <div className="su-input-label-div">
                                    <div className="su-field-error">
                                        {renderErrors && emailErr.length > 0 && emailErr}
                                    </div>
                                </div>
                                <div className={`su-pseudo-input ${emErrClass}`}>
                                    <input
                                        placeholder="Email"
                                        className="su-input-field"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="su-input-div">
                            <div className="su-input-inner-div">
                                <div className="su-input-label-div">
                                    <div className="su-field-error">
                                        {renderErrors && usernameErr.length > 0 && usernameErr}
                                    </div>
                                </div>
                                <div className={`su-pseudo-input ${unErrClass}`}>
                                    <input
                                        placeholder="Username"
                                        className="su-input-field"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="su-input-div">
                            <div className="su-input-inner-div">
                                <div className="su-input-label-div">
                                    <div className="su-field-error">
                                        {renderErrors && passErr.length > 0 && passErr}
                                    </div>
                                </div>
                                <div className={`su-pseudo-input ${pwErrClass}`}>
                                    <input
                                        placeholder="Password"
                                        className="su-input-field"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="su-input-div">
                            <div className="su-input-inner-div">
                                <div className="su-input-label-div">
                                    <div className="su-field-error">
                                        {renderErrors && confPassErr.length > 0 && confPassErr}
                                    </div>
                                </div>
                                <div className={`su-pseudo-input ${cpErrClass}`}>
                                    <input
                                        placeholder="Confirm Password"
                                        className="su-input-field"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="su-signup-btn-div">
                            <button
                                className="su-signup-btn"
                                type="submit"
                            >
                                Sign Up!
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupFormPage;
