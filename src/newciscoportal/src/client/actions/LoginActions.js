import dispatcher from "../dispatcher";

export function clearUser() {
	console.log('LoginActions: clearUser')
	dispatcher.dispatch({ type: "CLEAR_USER"});
}

export function addUserDetails(userName, roles) {
	console.log('LoginActions: addUserDetails')
	dispatcher.dispatch({ type: "ADD_USER_DETAILS", userName, roles });
}