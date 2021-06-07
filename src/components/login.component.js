import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

const required = value => {
    if (!value) {
        return (
            // alert("Please Input Email And Password")
            <span className="alert alert-danger" role="alert">
                This field is required!
            </span>
        );
    }
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.email, this.state.password).then(
                () => {
                    this.props.history.push("/profile");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <div className="col-md-14">
                <div className="card card-container card-outline card-primary">
                    <div class="card-header text-center">
                        <Link to={"/#"} className="h1"><b>Admin</b>|PET</Link>
                    </div>

                    {/* <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    /> */}
                    <div className="card-body">
                        <p class="login-box-msg">Sign in to start your session</p>
                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <Form
                            onSubmit={this.handleLogin}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            <div class="input-group mb-3">
                                <div class="input-group-append">
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                    // validations={[required]}
                                    />
                                    <div class="input-group-text">
                                        <span class="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-append">
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                    // validations={[required]}
                                    />
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                {/* <!-- /.col --> */}
                                <div class="col-md-12">
                                    <button
                                        className="btn btn-primary btn-block"
                                        disabled={this.state.loading}
                                    >
                                        <span>Sign In</span>
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                    </button>
                                </div>
                                <div class="col-md-12">
                                    <div class="icheck-primary">
                                        <input type="checkbox" id="remember"></input>
                                        <label for="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                                {/* <!-- /.col --> */}
                            </div>
                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                        <div class="social-auth-links text-center mt-2 mb-3">
                            <Link to={"/#"} className="btn btn-block btn-primary">
                                <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
                            </Link>
                            <Link to={"/#"} className="btn btn-block btn-danger">
                                <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
                            </Link>
                        </div>
                        {/* <!-- /.social-auth-links --> */}

                        <p class="mb-1">
                            <a href="forgot-password.html">I forgot my password</a>
                        </p>
                        <p class="mb-0">
                            <a href="register.html" class="text-center">Register a new membership</a>
                        </p>
                    </div>
                </div>

            </div>
        );
    }
}
