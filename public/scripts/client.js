/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const parseISODateTime = (dateTime) => {
  const time = {
    y: dateTime.slice(0, 5),
    m: dateTime.slice(6, 8),
    d: dateTime.slice(9, 11),
    h: dateTime.slice(12, 14),
    min: dateTime.slice(15, 17),
    s: dateTime.slice(18, 20),
    ms: dateTime.slice(21, 24)
  }
  for (t in time) {
    time[t] = Number(time[t]);
  }
 
  return time;
}

const getTimeAgo = (milliseconds) => {
  const currentTime = parseISODateTime(new Date().toISOString());
  const timePostedISO = (new Date(0)).setUTCSeconds(milliseconds).toISOString();
  const timePosted = parseISODateTime(timePostedISO);

  const timeRef = Object.keys(currentTime);
  const displayKey = timeRef.find(t => currentTime[t] !== timePosted[t]);
  const diffTime = currentTime[displayKey] - timePosted[displayKey];
  return `${diffTime} ${displayKey}${diffTime !== 1 ? '' : 's'} ago`; 
}

const createTweetElement = (tweet) => {
  const { user, content, created_at } = tweet;
  const { name, avatars, handle } = user;

  const exactTime = new Date(created_at);
  const timeAgo = getTimeAgo(created_at);

  let $tweet = '';
  $tweet += `<article>`;
  $tweet += `<header>`;
  $tweet += `<img src="${avatars}"></img>`;
  $tweet += `<h4>${name}</h4>`;
  $tweet += `<h4>${handle}</h4>`;
  $tweet += `</header>`;
  $tweet += `<p>${content.text}</p>`;
  $tweet += `<footer>`;
  $tweet += `<p title="${exactTime}">${timeAgo}</p>`;
  $tweet += `<div>`;
  $tweet += `<a class="fa fa-tripadvisor" aria-hidden="true"></a>`;
  $tweet += `<a class="fa fa-steam" aria-hidden="true"></a>`;
  $tweet += `<a class="fa fa-edge" aria-hidden="true"></a>`;
  $tweet += `</div>`;
  $tweet += `</footer>`;
  $tweet += `</article>`;
  return $tweet;
}

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

$(document).ready(() => {
  const $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $('.all-tweets').append($tweet);
});
