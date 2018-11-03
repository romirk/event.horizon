import React, { Component } from 'react';
import { Col, Modal } from 'react-bootstrap';

import CardContainer from "./home/CardContainer"
import LoginStore from "./../stores/LoginStore";

import Notification from 'rc-notification';
import 'rc-notification/assets/index.css';

let notification = null;
Notification.newInstance({}, (n) => notification = n);

export default class HomeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState() {
		return {
			showAddChallengeModal: false
		};
	}

	toggleAddChallengeModal = event =>{
		this.setState({showAddChallengeModal: !this.state.showAddChallengeModal});
	}

	render() {
		const cardData = [{title: "Title 1", tags: ["PRIVATE"], desc: "Example 1"}, 
			{title: "Title 2", tags: ["PRIVATE", "UNPUBLISHED"], desc: "Example 2"}];

		const cardsComponent = cardData.map((data, index) =>{
			return <CardContainer key={index} data={data} />
		})
		return (
			<Col xs={12} style={{height:"100vh", backgroundColor: "deepskyblue", height:"100vh"}}>
				<Col xs={12} md={8} mdOffset={2} sm={10} smOffset={1} style={{marginTop:"50px"}}>
					<Col md={3} style={{backgroundColor: "white", padding: "10px 0"}}>
						<div style={{height: "100px", width: "100px", marginLeft: "auto",
							marginRight: "auto", backgroundColor: "grey", borderRadius: "50%"}}>
						</div>
						<center>
							Discover & Engage
						</center>
						<div style={{backgroundColor: "aliceblue", padding: "10px 3px"}}>
							Challenges
						</div>
						<div style={{padding: "10px 3px"}}>
							Events
						</div>
						<div style={{padding: "10px 3px"}}>
							Programs
						</div>
						<div style={{padding: "10px 3px"}}>
							Spaces
						</div>
					</Col>
					<Col md={9}>
						<Col md={12}>
							<div className="col-sm-9" style={{padding: 0}}>
								<input type="text" placeholder="Search Challenges by Name, Date, Contacts/Editors" style={{width:"100%"}} />
							</div>
							<div className="col-sm-3" style={{padding: 0}}>
								<div style={{float: "left", textAlign: "center", fontSize: "24px", margin: "0 5px"}}>
									<i className="fa fa-filter" aria-hidden="true"></i>
								</div>
								<div style={{float: "left", textAlign: "center", fontSize: "24px", margin: "0 5px", 
									width: "35px", height: "35px", backgroundColor: "white", borderRadius: "50%",
									lineHeight: "38px"}}>
									<i className="fa fa-check" aria-hidden="true"></i>
								</div>
								<div style={{float: "left", textAlign: "center", fontSize: "24px", margin: "0 5px", 
									width: "35px", height: "35px", backgroundColor: "white", borderRadius: "50%",
									lineHeight: "38px", cursor: "pointer"}} onClick={this.toggleAddChallengeModal}>
									<i className="fa fa-plus" aria-hidden="true"></i>
								</div>
							</div>
						</Col>
						<Col md={12}>
							<div style={{fontSize: "18px", color: "white", backgroundColor: "darkblue",
								marginTop: "10px", padding: "4px"}}>
								My Challenges (3 Challenges)
							</div>
							{cardsComponent}
						</Col>
					</Col>
				</Col>
				<Modal show={this.state.showAddChallengeModal} onHide={this.toggleAddChallengeModal}>
					<Modal.Body>
						<h4>Request A Challenge</h4>
						<div className="col-xs-12" style={{paddingTop:"20px"}}>
						</div>
						<div className="clear-fix" />
					</Modal.Body>
				</Modal>
			</Col>
		);
	}}