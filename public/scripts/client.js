/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const parseDate = (date) => {
  const dateTime = date.toISOString();
  const time = {
    year: dateTime.slice(0, 4),
    month: dateTime.slice(5, 7),
    day: dateTime.slice(8, 10),
    hour: dateTime.slice(11, 13),
    minute: dateTime.slice(14, 16),
    second: dateTime.slice(17, 19),
    millisecond: dateTime.slice(20, 23)
  };
  for (const t in time) {
    time[t] = Number(time[t]);
  }
 
  return time;
};

const getTimeAgo = (milliseconds) => {

  const currentTime = parseDate((new Date()));
  const timePosted = parseDate(new Date(milliseconds));

  const timeRef = Object.keys(currentTime);
  const displayKey = timeRef.find(t => currentTime[t] !== timePosted[t]);
  const diffTime = currentTime[displayKey] - timePosted[displayKey];
  return `${diffTime} ${displayKey}${diffTime !== 1 ? 's' : ''} ago`;
};

const createTweetElement = (tweet) => {
  const { user, content, created_at } = tweet;
  const { name, avatars, handle } = user;
  const timePosted = new Date(0);
  
  timePosted.setUTCMilliseconds(created_at);

  let $tweet = '';
  $tweet += `<article>`;
  $tweet += `<header>`;
  $tweet += `<img src="${avatars}"></img>`;
  $tweet += `<h4>${name}</h4>`;
  $tweet += `<h4>${handle}</h4>`;
  $tweet += `</header>`;
  $tweet += `<p>${content.text}</p>`;
  $tweet += `<footer>`;
  $tweet += `<p title="${timePosted}">${getTimeAgo(created_at)}</p>`;
  $tweet += `<div>`;
  $tweet += `<a class="fa fa-tripadvisor" aria-hidden="true"></a>`;
  $tweet += `<a class="fa fa-steam" aria-hidden="true"></a>`;
  $tweet += `<a class="fa fa-edge" aria-hidden="true"></a>`;
  $tweet += `</div>`;
  $tweet += `</footer>`;
  $tweet += `</article>`;
  return $tweet;
};

const renderTweets = (tweetData) => {
  for (const tweet of tweetData) {
    $('.all-tweets').append(createTweetElement(tweet));
  }
};


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(document).ready(() => {
  renderTweets(data);
});
