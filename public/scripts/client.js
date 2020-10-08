/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const parseDate = (date) => {

  const time = {
    year: date.getYear(),
    month: date.getMonth(),
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    millisecond: date.getMilliseconds()
  };

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

const renderTweet = (tweet) => {
  $('.all-tweets').prepend(createTweetElement(tweet));
}

const loadTweets = () => {
  $.ajax({ 
    url: '/tweets/', 
    method: 'GET', 
  })
  .then(function (data) {    
    renderTweets(data.reverse());
  });
}

const loadNewestTweet = () => {
  $.ajax({
    url: '/tweets/',
    method: 'GET'
  })
  .then (function (data) {
    renderTweet(data.reverse()[0]);
  });
}

$(document).ready(function() {
  
  loadTweets();

  const $form = $('.new-tweet form');
  $form.submit(function(event) {
    event.preventDefault();
    const $tweetText = $('.new-tweet textarea').val();
    if(!$tweetText.length) {
      alert('Nothing in the text box!');
      return false;
    } else if($tweetText.length > 140) {
      alert('Tweet greater than 140 characters!');
      return false;
    } 
    $.ajax({ 
      url: '/tweets/', 
      method: 'POST', 
      data: $('.new-tweet textarea').serialize()
    })
    .then(function () {
      loadNewestTweet();
    });

  });
});
