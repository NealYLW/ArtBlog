import './login.scss'
import React from 'react'

const Login = () => {
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
                            <input type="text" className="inputs" placeholder="Enter your email" pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+" required />
                        </div>
                        <div className="input-items">
                            <span className="input-tips">
                                Password
                            </span>
                            <input type="password" className="inputs" placeholder="Enter password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,30}" required/>
                            <span className="forgot">Forgot Password</span>
                        </div>
                        <button className="btn">Log in</button>
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
