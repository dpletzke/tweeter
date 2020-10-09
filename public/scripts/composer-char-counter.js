$(document).ready(() => {
  $('#tweet-text').on('input', function() {
    const counter = $(this).siblings('div').children('output');
    counter.text(140 - this.value.length);
    if (Number(counter.text()) < 0) {
      counter.addClass('counter-negative');
    } else {
      counter.removeClass('counter-negative');
    }
  });
});