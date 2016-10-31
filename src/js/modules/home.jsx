'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import io from 'socket.io-client';

var socket = io.connect('http://localhost:3000');


var QuestionContainer = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.loadDatas();
	},
	loadDatas: function(datasToLoad){
		var that = this;
		return socket.on('datas', function(data){
			that.setState({data: JSON.parse(data)});
		});
	},
	render: function(){
		return (
			<div>
				<QuestionBlock data={this.state.data} />
			</div>
		);
	}
});


var QuestionBlock = React.createClass({
	render: function(){
		var datas = this.props.data;
		var style = {
			fontFamily: "arial"
		}
		return (
			<div style={style} className="questionBlock">
				<h2>{datas.question}</h2>
				<AnswerBlock data={datas.answers}/>
			</div>
		);
	}
});

var AnswerBlock = React.createClass({
	handleClick: function(e){
		e.preventDefault();
		$('.resBlock').html('');

		var scope = $(e.currentTarget),
			data = this.props.data,
			toDisplay = data.no;

		if(scope.val() == "true"){
			toDisplay = data.yes;
		}

		$('.resBlock').append(toDisplay);
	},
	render: function(){
		var resStyle = {
				margin: 15,
				fontSize: 25
		};
		var answerStyle = {
			background: "none",
			border: "1px solid black",
			margin: 5
		};
		return (
			<div className="answerBlock">
				<button style={answerStyle} onClick={this.handleClick} value="true">Oui</button>
				<button style={answerStyle} onClick={this.handleClick} value="false">Non</button>
				<div style={resStyle} className="resBlock"></div>
			</div>
		);
	}
});


export default QuestionContainer;