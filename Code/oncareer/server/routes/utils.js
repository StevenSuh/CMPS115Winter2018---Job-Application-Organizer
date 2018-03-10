const express = require('express');
const router = express.Router();
const request = require('request');
const h2p = require('html2plaintext');

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

router.get('/search?', (req, res, next) => {
  const indeed = 'https://www.indeed.com/jobs';
  const term = req.query.term || '';
  const location = req.query.location || '';
  const offset = req.query.offset || 0;

  request(
    `${indeed}?q=${term}&l=${location}&limit=10&start=${offset}&sort=date`, 
    function(err, response, body) {
      const result = parseJobs(body);
      
      return res.json(result);
    }
  );
});

module.exports = router;

function parseJobs(body) {
  const outputArr = [{}];
  const output = outputArr[0];

  let start_point = body.indexOf('organicJob');
  if (start_point < 0) return;

  start_point = body.lastIndexOf('<div', start_point);

  let end_point = body.indexOf('</div>', body.indexOf('</table>', start_point));

  const item = body.substring(start_point, end_point);

  // job title
  let point = item.indexOf('data-tn-element="jobTitle"');
  point = item.indexOf('>', point)+1;
  output.title = h2p(item.substring(point, item.indexOf('</a>', point))).trim();

  // link
  point = item.lastIndexOf('href="', point)+6;
  output.link = `https://www.indeed.com${item.substring(point, item.indexOf('"', point))}`;

  // company
  point = item.indexOf('class="company"');
  point = item.indexOf('>', point)+1;
  output.company = h2p(item.substring(point, item.indexOf('</span>', point))).trim();
  if (output.company[0] === '<') {
    point = item.indexOf('>', item.indexOf('<a', point))+1;
    output.company = h2p(item.substring(point, item.indexOf('<', point))).trim();
  }

  // location
  point = item.indexOf('class="location"');
  point = item.indexOf('>', point)+1;
  output.location = item.substring(point, item.indexOf('<', point)).trim();

  // description
  point = item.indexOf('class=summary');
  point = item.indexOf('>', point)+1;
  output.description = h2p(item.substring(point, item.indexOf('</span>', point))).trim();

  // date
  point = item.indexOf('class="date"');
  point = item.indexOf('>', point)+1;
  output.date = item.substring(point, item.indexOf('</span>', point)).trim();

  const newBody = body.substring(end_point, body.length);
  return outputArr.concat(parseJobs(newBody));
}

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

  if (!output.logo.includes('http')) {
    point = body.indexOf('og:image');
    point = body.indexOf('content="', point)+9;
    output.logo = body.substring(point, body.indexOf('"', point));
  }


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
  point = body.indexOf('id="where"');
  point = body.lastIndexOf('value="', point)+7;
  output.description = body.substring(point, body.indexOf('"', point));

  return output;
}

