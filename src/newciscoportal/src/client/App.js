import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Redirect} from 'react-router-dom';

import LoginContainer from './components/LoginContainer'
import DashboardContainer from './components/DashboardContainer'
import HomeContainer from './components/HomeContainer'
import StudentDashboardContainer from './components/StudentDashboardContainer'

import './style/app.css';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}


	render() {
		return (
			<Router>
				{/*<div className="main-wrapper">
					<aside id="left-sidebar">
					</aside>
					<div className="page-top-bar" style={{minHeight:"75px", backgroundColor:"#269abc"}}>
					</div>

					<div className="page-wrapper">
						<div className="container-fluid"style={{marginTop: "50px"}}>*/}
							<Switch>
								{/*Homepage*/}
								<Route path="/" exact strict component={LoginContainer} />

								<Route path="/user/login" exact strict component={LoginContainer} />
								{/*<Route path="/user/register" exact strict component={RegisterContainer} />*/}

								<Route path="/admin/home" exact strict component={HomeContainer} />
								<Route path="/admin/dashboard" exact strict component={DashboardContainer} />
								<Route path="/student/dashboard" exact strict component={StudentDashboardContainer} />
								{/*Default page to load if no mapped route found*/}
								<Redirect to="/" />
							</Switch>
						{/*</div>
					</div>
				</div>*/}
			</Router>
		);
	}
}