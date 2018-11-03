import React, { Component } from 'react';
import Notification from 'rc-notification';
import DayPicker, { DateUtils } from 'react-day-picker';

import { Col, Modal } from 'react-bootstrap';

import LoginStore from "./../stores/LoginStore";
import EventStore from "./../stores/EventStore";
import * as EventActions from "./../actions/EventActions";

import 'rc-notification/assets/index.css';
import 'react-day-picker/lib/style.css';

let notification = null;
Notification.newInstance({}, (n) => notification = n);

export default class DashboardContainer extends Component {
	static defaultProps = {
		numberOfMonths: 2,
	};
	constructor(props) {
		super(props);
		this.handleDayClick = this.handleDayClick.bind(this);
		this.handleResetClick = this.handleResetClick.bind(this);
		this.addEvent = this.addEvent.bind(this);
		this.handleShowAddEvent = this.handleShowAddEvent.bind(this);
		this.handleHideAddEvent = this.handleHideAddEvent.bind(this);		
		this.updateEventTitle = this.updateEventTitle.bind(this);		
		this.state = this.getInitialState();
	}

	getInitialState() {
		return {
			from: undefined,
			to: undefined,
			showAddEvent: false,
			eventTitle: "",
			userName: LoginStore._getUserName()
		};
	}

	handleDayClick(day) {
		const range = DateUtils.addDayToRange(day, this.state);
		this.setState(range);
	}

	handleResetClick() {
		this.setState(this.getInitialState());
	}

	addEvent() {
		if(this.state.eventTitle && this.state.eventTitle.length > 0){
			EventActions.addEvent({title: this.state.eventTitle, from: this.state.from, to: this.state.to});
			this.handleHideAddEvent();
			this.handleResetClick();
			const notifyContent = <span>Event added</span>
			notification.notice({
				content: notifyContent,
				duration: 3,
			});
		} else {
			const notifyContent = <span>Please provide event title</span>
			notification.notice({
				content: notifyContent,
				duration: 3,
			});
		}
	}

	handleShowAddEvent() {
		this.setState({showAddEvent : true});
	}

	handleHideAddEvent() {
		this.setState({showAddEvent : false});
	}

	updateEventTitle = event => {
		this.setState({ eventTitle: event.target.value});
	}

	render() {
		const { from, to } = this.state;
		const modifiers = { start: from, end: to };
		let selectedDays = EventStore._getEvents().map((details, index) => {
			const after = new Date(details.from);
			const before = new Date(details.to);
			if(before > after){
				after.setDate(after.getDate() - 1);
				before.setDate(before.getDate() + 1);
				return { after, before};
			}
			else
				return after;
		});
		selectedDays.push(from);
		selectedDays.push({ from, to });

		let blockDays = [{ before: new Date() }];


		return (
			<Col xs={12} md={6} mdOffset={3} sm={10} smOffset={1}>
				<h2>{this.state.userName}</h2>

				<div className="date-range-div">
					<p style={{height: "40px"}}>
						{!from && !to && 'Please select the first day.'}
						{from && !to && 'Please select the last day.'}
						{from &&
							to &&
							`Selected from ${from.toLocaleDateString()} to
									${to.toLocaleDateString()}`}{' '}
						{from &&
							to && (<span>
								<button className="btn btn-info link" onClick={this.handleResetClick}>
									Reset
								</button>
								<button className="btn btn-info link" onClick={this.handleShowAddEvent}>
									Add Event
								</button>
								</span>
							)}
					</p>
					<DayPicker
						className="Selectable"
						numberOfMonths={this.props.numberOfMonths}
						selectedDays={selectedDays}
						modifiers={modifiers}
						onDayClick={this.handleDayClick}
						disabledDays={ blockDays}
					/>
				</div>
				<Modal show={this.state.showAddEvent} onHide={this.handleHideAddEvent}>
					<Modal.Body>
						<h4 className="template-setup">
							Add Event
						</h4>
						<div className="row template-selection">
							<div className="material-group">
								<input className="material-input" type="text" onChange={this.updateEventTitle} required />
								<span className="material-highlight"></span>
								<span className="material-bar"></span>
								<label className="material-label">Event Title</label>
							</div>
						</div>
						<div className="to-right custom-link" onClick={this.addEvent}>Create Event</div>
						<div className="clear-fix" />
					</Modal.Body>
				</Modal>
			</Col>
		);
	}}