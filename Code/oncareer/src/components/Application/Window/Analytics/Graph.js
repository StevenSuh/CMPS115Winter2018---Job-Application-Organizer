import React, { Component } from 'react';
import { BarChart, Bar, PieChart, Pie, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import classes from './styles.css';
import Auth from '../../../Login/Auth';
import url from '../../../../url';
import axios from 'axios';
import moment from 'moment';

class Graph extends Component {
	constructor(props){
		super(props);

		const newDay = [];
		const currDate = new Date();
		const oldDate = new Date(currDate.setDate(currDate.getDate()-6))
		for(let i = 0; i < 7; i++){
			newDay.push(
				moment(oldDate.setDate(currDate.getDate() + i)).format('YYYY-MM-DD')
			);
		}

		this.state = {data: [
			{name: '3/4', uv: 2},
		      {name: '3/5', uv: 3, },
		      {name: '3/7', uv: 1, },
		      {name: '3/8', uv: 2, },
		      {name: '3/9', uv: 3, },
		      {name: '3/10', uv: 2, },
		      {name: '3/11', uv: 4  },
			],
			boards: [],
			counter: [{date: '', amt: 0},
						{date: '', amt: 0},
						{date: '', amt: 0},
						{date: '', amt: 0},
						{date: '', amt: 0},
						{date: '', amt: 0},
						{date: '', amt: 0}],
			days: newDay,
			rate: []
		};
		console.log(this.state.days);
	}
	componentDidMount(){
		axios.get(`${url}boards/acc/${Auth.getId()}`)
		.then(res => {
			const newCounter = this.state.counter.slice();
			var board = res.data.find(el => el.board_name === 'Applied');

			if(board != null){
				var job = board['jobs'];
			}
			if(job != null){
				for(var i = 0; i < this.state.days.length; i++){
					var counter = 0;
					for(var j = 0; j < job.length; j++){
						if(job[j].date == this.state.days[i])
							counter++;
					}
					newCounter[i].amt = counter;
					newCounter[i].date = moment(this.state.days[i]).format('M/D');
				}
			}

			var board1 = res.data.find(el => el.board_name === 'Offer');
			var board2 = res.data.find(el => el.board_name === 'Interview');

			const totalJobs = board['jobs'].length + board1['jobs'].length + board2['jobs'].length;

			const newRate = [];
			newRate.push([{name: 'Interview + Offer', amt: totalJobs - board['jobs'].length},
						  {name: 'Applied', amt: board['jobs'].length}]);
			newRate.push([{name: 'Interview', amt: board2['jobs'].length},
						  {name: 'Offer', amt: board1['jobs'].length},
						  {name: 'Applied', amt: board['jobs'].length}]);
			this.setState({ ...this.state, counter: newCounter, boards: res.data, rate: newRate});

		});
	}
	render(){
		console.log(this.state.boards);
		console.log(this.state.counter);
		return (
		  <div>
		  	<span style={{ display: 'inline-block' }}>
			<h3 style={{ width: 500 }}>Number of Applied</h3>
	        <BarChart style={{ display: 'inline-block' }} width={500} height={250} data={this.state.counter} margin={{top: 5, right: 30, left: 10, bottom: 5}} >
	        <XAxis dataKey="date"/>
	        <YAxis/>
	        <CartesianGrid strokeDasharray="3 3"/>
	        <Tooltip/>
	        <Bar dataKey="amt" fill="#1565c0" />
	        </BarChart>
	        </span>

	        <span style={{ display: 'inline-block' }}>
	        <h3 style={{ width: 500 }}>Response Rate</h3>
	        <PieChart style={{ display: 'inline-block' }} width={500} height={250}>
				<Pie data={this.state.rate[0]} dataKey="amt" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#1565c0" />
				<Tooltip/>
				<Pie data={this.state.rate[1]} dataKey="amt" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#b1dbef" label />
			</PieChart>
			</span>
		  </div>
		);
	}
}
export default Graph;
