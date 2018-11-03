import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import LoginStore from "./../stores/LoginStore";
import EventStore from "./../stores/EventStore";

import 'react-big-calendar/lib/css/react-big-calendar.css'
// import 'react-day-picker/lib/style.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

export default class StudentDashboardContainer extends Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState() {
		return {
			from: undefined,
			to: undefined,
			userName: LoginStore._getUserName()
		};
	}

	render() {
		const { from, to } = this.state;
		const modifiers = { start: from, end: to };
		let selectedDays = EventStore._getEvents().map((details, index) => {
			let data = {};
			data.id = index;
			data.title = details.title;
			data.allDay =  true;
			data.start = new Date(details.from);
			data.end = new Date(details.to);

			return data;
		});

		let blockDays = [{ before: new Date() }];


		return (
			<Col xs={12} md={6} mdOffset={3} sm={10} smOffset={1}>
				<h2>{this.state.userName}</h2>

				<div className="date-range-div">
					<BigCalendar events={selectedDays} showMultiDayTimes 
					views={['month']}/>
				</div>
			</Col>
		);
	}
}