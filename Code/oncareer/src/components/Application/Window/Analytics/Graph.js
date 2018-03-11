import React, { Component } from 'react';
import { BarChart, Bar, PieChart, Pie, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import classes from './styles.css';
import Auth from '../../../Login/Auth';
import url from '../../../../url';
import axios from 'axios';

class Graph extends Component {
	constructor(props){
		super(props);
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
			counter: [{date: '', amt: ''}],
			date: ['2018-03-04', '2018-03-05', '2018-03-05', '2018-03-06', '2018-03-07',
				   '2010-03-08', '2018-03-09', '2018-03-10', '2018-03-11'],
			rate: [{name: '', interviewed: 3}]

		};
	}
	componentDidMount(){
		axios.get(`${url}boards/acc/${Auth.getId()}`)
		.then(res => {
			this.setState({boards: res.data});
		});
	}
	render(){
		console.log(this.state.boards);
		var board = this.state.boards[2]
		console.log(board['_id']);
		
		var d = new Date();
		console.log(d.getDay());

		return (
		  <div>
			<h3>Number of Applied</h3>
			<BarChart width={600} height={200} data={this.state.data} margin={{top: 5, right: 30, left: 10, bottom: 5}} >
	        <XAxis dataKey="name"/>
	        <YAxis/>
	        <CartesianGrid strokeDasharray="3 3"/>
	        <Tooltip/>
	        <Bar dataKey="uv" fill="#8884d8" />
	        </BarChart> 

	        <h3>Response Rate</h3>
	        <PieChart width={600} height={250}>
			<Pie data={this.state.data} dataKey="uv" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
			<Pie data={this.state.data} dataKey="uv" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
			</PieChart>
		  </div>
		);
	}
}
export default Graph;