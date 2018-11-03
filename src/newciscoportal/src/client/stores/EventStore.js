import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class EventStore extends EventEmitter {
	constructor(props) {
		super(props);

		if(localStorage.getItem('events'))
			this.events = JSON.parse(localStorage.getItem('events'));
		else
			this.events = [];
	}
	_getEvents() { return this.events; }

	_addEvent(eventDetails) {
		console.log('EventStore: _addEvent')
		this.events.push(eventDetails);
		localStorage.setItem('events', JSON.stringify(this.events));
		this.emit('update');
	}

	handleActions(action) {
		console.log('EventStore: action - ' + JSON.stringify(action))
		switch(action.type){
			case 'ADD_EVENT':
				this._addEvent(action.eventDetails);
			break;
			default:
				console.log('EventStore: No handler for action.')
			break;
		}
	}
}

const eventStore = new EventStore;
dispatcher.register(eventStore.handleActions.bind(eventStore));

export default eventStore;

