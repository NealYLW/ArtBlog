import './login.scss'
import { loginRequest } from '../../request/api';
import React, {useState} from 'react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

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

    const handleSubmit = (e) => {
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
                        <h1>Log in</h1>
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
                            <span className="forgot">Forgot Password</span>
                        </div>
                        <button className="btn" onClick={handleSubmit}>Log in</button>
                        <div className="siginup-tips">
                            <span>Don't Have An Account?</span>
                            <span>Signup</span>
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
