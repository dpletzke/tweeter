
const renderTweets = (tweetData) => {
  for (const tweet of tweetData) {
    $('.all-tweets').append(createTweetElement(tweet));
  }
};

const renderTweet = (tweet) => {
  $('.all-tweets').prepend(createTweetElement(tweet));
};

const loadTweets = () => {
  $.ajax({
    url: '/tweets/',
    method: 'GET',
  })
    .then(function(data) {
      renderTweets(data.reverse());
    });
};

const loadNewestTweet = () => {
  $.ajax({
    url: '/tweets/',
    method: 'GET'
  })
    .then(function(data) {
      renderTweet(data.reverse()[0]);
    });
};

$(document).ready(function() {
  const $errorLabel = $('.new-tweet .error');
  $errorLabel.hide();
  
  loadTweets();

  const $form = $('.new-tweet form');
  $form.submit(function(event) {
    event.preventDefault();

    const $tweetText = $('.new-tweet textarea').val();
    if (!$tweetText.length) {
      $errorLabel.hide();
      $errorLabel.text('❕Your text box is empty! Input is required.');
      $errorLabel.slideDown();
      return false;

    } else if ($tweetText.length > 140) {
      $errorLabel.hide();
      $errorLabel.text('❕Your tweet is longer than 140 characters! Shorter message required.');
      $errorLabel.slideDown();
      return false;
    }
    
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: $('.new-tweet textarea').serialize()
    })
      .then(function() {
        $('.new-tweet textarea').val('');
        loadNewestTweet();
      });

  });
});
