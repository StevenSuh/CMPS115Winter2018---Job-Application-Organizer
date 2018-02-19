const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/parsing?', (req, res, next) => {
  // request.body
  request(
    req.query.url, 
    function(error, response, body) {
      let host = response.request.uri.host;

      if (host.indexOf('www') === 0) {
        host = host.substring(host.indexOf('.')+1, host.lastIndexOf('.'));
      }
      
      switch (host) {
        case 'indeed':
          res.json(parseIndeed(body));
          return;
        default:
          return;
      }
    }
  );
});

module.exports = router;

function parseIndeed(body) {
  const output = { title: '', company: '', logo: '', date: '', description: '' };

  // title
  let point = body.indexOf('class="jobtitle"');
  point = body.indexOf('>', point)+1;
  point = body.indexOf('>', point)+1;
  output.title = body.substring(point, body.indexOf('<', point));

  // company
  point = body.indexOf('class="company"');
  point = body.indexOf('>', point)+1;
  output.company = body.substring(point, body.indexOf('<', point));

  // logo
  point = body.indexOf('class="cmp_logo_img"');
  point = body.lastIndexOf('src="', point)+5;
  output.logo = body.substring(point, body.indexOf('"', point));

  // date
  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  output.date = `${year}-${month}-${day}`;

  // description
  // location
  point = body.indexOf('class="location"');
  point = body.indexOf('>', point)+1;
  output.description = body.substring(point, body.indexOf('<', point));

  return output;
}

