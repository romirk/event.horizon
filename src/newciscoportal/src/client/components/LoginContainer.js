import React, { Component } from 'react';
import Notification from 'rc-notification';

import { Button, Col } from 'react-bootstrap';

import * as LoginActions from "./../actions/LoginActions";

import 'rc-notification/assets/index.css';

let notification = null;
Notification.newInstance({}, (n) => notification = n);

export default class LoginContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			usernameError: "",
			passwordError: ""
		};
	}

	componentDidMount() {
	}

	validateUsername = value =>{
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!re.test(value)){
			return false;
		}
		return true;
	};

	validateForm() {
		let usernameError = "", passwordError = "";
		let valid = true;
		if(this.state.username.length == 0){
			usernameError = "Email ID is required";
			valid = false;
		}else if(!this.validateUsername(this.state.username)){
			usernameError = "Invalid Email ID";
			valid = false;
		}
		if(this.state.password.length == 0){
			passwordError = "Password is required";
			valid = false;
		}
		this.setState({
			usernameError, passwordError
		});
		return valid;
	}

	handleChange = event => {
		let usernameError = this.state.usernameError;
		let passwordError = this.state.passwordError;

		if(event.target.value.length > 0){
			if(event.target.id == "username"){
				usernameError = "";
			}else{
				passwordError = "";
			}
		}
		this.setState({
			[event.target.id]: event.target.value,
			usernameError,
			passwordError
		});
	}

	handleSubmit = event => {
		event.preventDefault();

		if(this.validateForm()){
			if(this.state.username == "admin@school.com" && this.state.password == "admin"){
				const username = "System administrator";
				LoginActions.addUserDetails(username, ["admin"]);

				const notifyContent = <span>Welcome {username}</span>
				notification.notice({
					content: notifyContent,
					duration: 3,
				});

				this.props.history.push('/admin/home')
			}else if(this.state.username == "student@school.com" && this.state.password == "student"){
				const username = "Student 1";
				LoginActions.addUserDetails(username, ["student"]);

				const notifyContent = <span>Welcome {username}</span>
				notification.notice({
					content: notifyContent,
					duration: 3,
				});

				this.props.history.push('/student/dashboard')
			}else{
				const notifyContent = <span>Login failed, invalid email or password</span>
				notification.notice({
					content: notifyContent,
					duration: 3,
				});
			}
			/*fetch('/service/userLogin', {
				method: 'post',
				headers: {'Content-Type':'application/json'},
				body: JSON.stringify({ 
					"username" : this.state.username,
					"password": this.state.password
				})
			})
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if(json){
					if(json.status == "success"){
						alert(json.message);
					}else {
						alert(json.message);
					}
				}
			}).catch((err) => {
				console.log(err);
			})*/
		}
	}

	render() {
		return (
			<div>
				<Col xs={12} md={4} mdOffset={4} sm={8} smOffset={2}>
					<div className="Login">
						<form onSubmit={this.handleSubmit}>
							<div className="material-group">
								<input id="username" className="material-input" type="text" required 
								onChange={this.handleChange}/>
								<span className="material-highlight"></span>
								<span className="material-bar"></span>
								<label className="material-label">Email</label>
							</div>
							<div className="material-group">
								<input id="password" className="material-input" type="password" required 
								onChange={this.handleChange}/>
								<span className="material-highlight"></span>
								<span className="material-bar"></span>
								<label className="material-label">Password</label>
							</div>

							<Button className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" 
								block bsSize="large" type="submit">
								Login
							</Button>
						</form>
					</div>
				</Col>
			</div>
		);
	}
}