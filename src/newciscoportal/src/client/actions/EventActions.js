import dispatcher from "../dispatcher";

export function addEvent(eventDetails) {
	console.log('EventActions: addUserDetails')
	dispatcher.dispatch({ type: "ADD_EVENT", eventDetails });
}