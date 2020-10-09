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

const escape =  function(str) {
  let p = document.createElement('p');
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
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
  $tweet += `<p>${escape(content.text)}</p>`;
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
