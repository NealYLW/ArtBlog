import './login.scss'
import { loginRequest, signupRequest } from '../../request/api';
import React, {useState} from 'react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isSignupMode, setIsSignupMode] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        const emailPattern = "[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+";
        setEmailError(!e.target.value.match(emailPattern));
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        const passwordPattern = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,30}";
        setPasswordError(!e.target.value.match(passwordPattern));
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        loginRequest({ email, password })
            .then(data => {
                // handle successful login here
                console.log(data);
            })
            .catch(error => {
                // handle login error here
                console.log(error);
            });
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            // handle password confirmation error here
            console.log('Passwords do not match');
            return;
        }
        signupRequest({ email, password })
            .then(data => {
                // handle successful signup here
                console.log(data);
            })
            .catch(error => {
                // handle signup error here
                console.log(error);
            });
    };

    return (
        <div className="content">
            <div className="login-wrapper">
                <div className="left-img">
                    <div className="glass">
                        <div className="tips">
                            <div className="title">
                                THE SPACE NETWORK
                            </div>
                            <h1>Explore The Universe</h1>
                            <span>5 Million+ people have joined our network.</span>
                            <span>We invite you to join the tribe</span>
                        </div>
                    </div>
                </div>
                <div className="right-login-form">
                    <div className="form-wrapper">
                        {isSignupMode ? <h1>Sign Up</h1> : <h1>Log in</h1>}
                        <div className="input-items">
                            <span className="input-tips">
                                Email Address
                            </span>
                            <input type="email" className="inputs" placeholder="Enter your email" value={email} onChange={handleEmailChange} onBlur={handleEmailChange} required />
                            {emailError && <span className='email-error'>Please enter a valid email address.</span>}
                        </div>
                        <div className="input-items">
                            <span className="input-tips">
                                Password
                            </span>
                            <input type="password" className="inputs" placeholder="Enter password" value={password} onChange={handlePasswordChange} onBlur={handlePasswordChange} required/>
                            {passwordError && <span className='password-error'>Password must contain at least one number and one uppercase and lowercase letter, and between 7 to 30 characters.</span>}
                            {isSignupMode && (
                                <div>
                                    <span className="input-tips">
                                        Confirm Password
                                    </span>
                                    <input type="password" className="inputs" placeholder="Enter password again" value={confirmPassword} onChange={handleConfirmPasswordChange} required/>
                                </div>
                            )}
                            {!isSignupMode && <span className="forgot">Forgot Password</span>}
                        </div>
                        {isSignupMode 
                            ? <button className="btn" onClick={handleSignupSubmit}>Sign Up</button>
                            : <button className="btn" onClick={handleLoginSubmit}>Log in</button>
                        }
                        <div className="siginup-tips">
                            {!isSignupMode ? (
                                <React.Fragment>
                                    <span>Don't Have An Account?</span>
                                    <span onClick={() => setIsSignupMode(true)}>Signup</span>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <span>Already have an account?</span>
                                    <span onClick={() => setIsSignupMode(false)}>Log in</span>
                                </React.Fragment>
                            )}
                        </div>
                        <div className="other-login">
                            <div className="divider">
                                <span className="line"></span>
                                <span className="divider-text">or</span>
                                <span className="line"></span>
                            </div>
                            <div className="other-login-wrapper">
                                <div className="other-login-item">
                                    <img src="../image/bilibili.png" alt="QQ" />
                                </div>
                                <div className="other-login-item">
                                    <img src="../image/bilibili.png" alt="WeChat" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login
