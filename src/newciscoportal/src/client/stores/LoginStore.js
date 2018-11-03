import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class LoginStore extends EventEmitter {
	constructor(props) {
		super(props);

		if(localStorage.getItem('roles'))
			this.roles = JSON.parse(localStorage.getItem('roles'));
		else
			this.roles = [];
		this.userName = localStorage.getItem('userName') || "";
	}
	_getUserName() { return this.userName; }
	_getRole() { return this.roles; }
	_addUserDetails(userName, roles) {
		console.log('LoginStore: _addUserDetails')
		this.userName = userName;
		this.roles = roles;
		localStorage.setItem('userName', userName);
		localStorage.setItem('roles', JSON.stringify(roles));
		this.emit('update');
	}
	_clearUser() {
		console.log('LoginStore: _clearUser')
		this.userName = "";
		this.role = "";
		localStorage.removeItem('userName');
		localStorage.removeItem('roles');
		this.emit('update');
	}

	handleActions(action) {
		console.log('LoginStore: action - ' + JSON.stringify(action))
		switch(action.type){
			case 'CLEAR_USER':
				this._clearUser();
			break;
			case 'ADD_USER_DETAILS':
				this._addUserDetails(action.userName, action.roles);
			break;
			default:
				console.log('LoginStore: No handler for action.')
			break;
		}
	}
}

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleActions.bind(loginStore));

export default loginStore;

