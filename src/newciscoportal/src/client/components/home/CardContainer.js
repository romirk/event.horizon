import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

export default class CardContainer extends Component {
	render() {
		const tags = this.props.data.tags.map((tag, index) =>{
			return (<span key={index} style={{fontSize: "12px", padding: "1px 10px", backgroundColor: "grey", 
					color: "white", marginLeft: "10px", borderRadius: "8px"}}>
					{tag}
				</span>);
		})
		return (<Col md={4} style={{padding: "5px"}}>
			<div style={{backgroundColor: "white", padding: "1px 10px"}}>
				<div style={{margin: "10px 0", border:"solid 1px grey", padding: "10px", color: "deepskyblue"}}>
					<div style={{height: "100px", width: "100px", 
						backgroundColor: "grey", borderRadius: "50%", margin: "10px auto"}}>
					</div>
					<div style={{position: "absolute", top: "20px", right: "25px",
						border: "solid 1px deepskyblue", padding: "0 5px", borderRadius: "50%"}}>
						<i className="fa fa-trash" aria-hidden="true"></i>
					</div>
					<div style={{height: "50px", overflow: "hidden", wordBreak: "break-all"}}>
						{this.props.data.title}
						{tags}
					</div>
					<div style={{height: "50px", overflow: "hidden"}}>
						{this.props.data.desc}
					</div>
				</div>
			</div>
		</Col>);
	}
}