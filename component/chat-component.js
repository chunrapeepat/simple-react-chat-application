
var ChatApplication = React.createClass({
	getInitialState: function(){
		return {
			message: [],
			socket: window.io('http://localhost:3000')
		}
	},
	componentDidMount: function(){
		var self = this;
		var messages = [];
		this.state.socket.on('response-message', function(msg){
			messages.push(msg);
			self.setState({ message: messages });
		});
		this.state.socket.on('welcome', function(msg){
			messages.push(msg);
			self.setState({ message: messages });
		});
	},
	submitMessage: function(){
		var message = document.getElementById("message").value;
		this.state.socket.emit('message', message);
		document.getElementById("message").value = "";
	},
	render: function(){

		var self = this;

		var i = 0;
		var showMessages = this.state.message.map(function(msg){
			return <li>{msg}</li>
		});

		return(
			<div>
				<h3>{ this.props.header }</h3>
				<ul>
					{showMessages}
				</ul>
				<input id="message" type="text"/> <button onClick={() => self.submitMessage()}>Send Message</button>
			</div>
		)
	}
});

ReactDOM.render(<ChatApplication header="Funny Chat Application" />, document.getElementById('chat'));
