import { axiosGet } from './getdata';
import queryStrings from './queryStrings';
import qs from 'query-string';

export default function jobSearch(url, publisherId) {
  //const endpoint = '/apisearch';
  queryStrings.publisher = publisherId;

  this.page = function(page) {
    queryStrings.p = page;
    return this;
  };

  this.descending = descending => {
    queryStrings.d = descending;
    return this;
  };

  this.company = company => {
    queryStrings.c = company;
    return this;
  };

  this.category = category => {
    queryStrings.cat = category;
    return this;
  };

  this.level = level => {
    queryStrings.l = level;
    return this;
  };

  this.location = location => {
    queryStrings.loc = location;
    return this;
  };
  
  this.userIp = userIp => {
    queryStrings.userip = userIp;
    return this;
  };

  this.userAgent = userAgent => {
    queryStrings.useragent = userAgent;
    return this;
  };
  this.done = () => {
    if (queryStrings.userip && queryStrings.useragent) {
      let params = qs.stringify(queryStrings);
      //let fullURL = `${url}${endpoint}?${params}`;
      let fullURL = `${url}?${params}`;
      return axiosGet(fullURL).then(response => response);
    } else {
      throw Error('Missing user ip or user agent');
    }
  };
}
