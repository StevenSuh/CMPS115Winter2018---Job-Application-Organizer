const axios = require('axios');
const usersData = require('./tempData/users.json');

const url = 'http://localhost:3001/boards/';

module.exports = async () => {
  let data, boards = [], stored = [];

  for (let i = 0; i < usersData.length; i++) {
    const boardsData = require('./tempData/boards.json');

    for (let j = 0; j < boardsData.length; j++) {
      boardsData[j].user_id = usersData[i].user_id;
      boardsData[j].index = j;
    }
    boards.push(boardsData);
  }

  for (let i = 0; i < boards.length; i++) {
    for (let j = 0; j < boards[i].length; j++) {
      try {
        const response = await axios.post(`${url}`, boards[i][j]);
        data = response.data;
        stored.push(data);
      } catch (err) {
        return console.error('post:', err);
      }
    }
  }

  for (let i = 0; i < stored.length; i++) {
    try {
      const response = await axios.delete(`${url}${stored[i]._id}`);
      data = response.data;

      if (data._id !== stored[i]._id) {
        return console.error('board_name mismatch');
      }
      if (data.board_name !== stored[i].board_name) {
        return console.error('board_name mismatch');
      }
      if (data.user_id !== stored[i].user_id) {
        return console.error('user_id mismatch');
      }
      if (data.index !== stored[i].index) {
        return console.error('index mismatch');
      }
      
      const jobs = data.jobs;
      const storedJobs = stored[i].jobs;
      
      for (let j = 0; j < jobs.length; j++) {
        if (jobs[j].title !== storedJobs[j].title) {
          return console.error('job title mismatch');
        }
        if (jobs[j].company !== storedJobs[j].company) {
          return console.error('job company mismatch');
        }
        if (jobs[j].date !== storedJobs[j].date) {
          return console.error('job date mismatch');
        }
        if (jobs[j].logo !== storedJobs[j].logo) {
          return console.error('job logo mismatch');
        }
        if (jobs[j].description !== storedJobs[j].description) {
          return console.error('job description mismatch');
        }
      }
    } catch (err) {
      return console.error('delete:', err);
    }
  }
  console.log('test success!');
}