// node load and cache Javascript Modules
// this assigns a prototype function 'twit' to a variable Twit
var Twit = require('twit');
var chrono = require('chrono-node');
var config = require('./config');

// Constructor
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor

// creates a Twit object called T
var T = new Twit({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token: config.twitter.access_token,
  access_token_secret: config.twitter.access_token_secret
});

// use the get object function, which has parameters and a callback function
// the parameters are used to query twitter
// the callback function is how you can use the parameter results

// T.get(path, [params], callback)
// T.post(path, [params], callback)
// T.stream(path, [params])
// T.get('search/tweets', { q: 'banana since:2011-11-11', count: 2 }, function(err, reply) {
//   debugger;
// });


function get_time(username, count){
  T.get('statuses/home_timeline', { count: count, screen_name: username, trim_user: true, exclude_replies: true },  function (err, reply) {
    return scrape_tweet_dates(reply);
  });
}

function scrape_tweet_dates(tweets) {
  var array = [];
  for (var tweet = 0; tweet<tweets.length; tweet++)
  {
    var date = text_date(tweets[tweet].text) || 0;
    if (date.length !== 0) {array.push(date, tweets[tweet].text, tweets[tweet].id_str);}
  }
  return array;
}

function text_date(tweet) {
  return chrono.parse(tweet);
}
