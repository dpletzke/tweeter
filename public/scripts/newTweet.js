// $(document).ready(function() {
//   const $button = $('.new-tweet button');
//   $button.submit(function () {
//     console.log('Button clicked, performing ajax call...');
//     $.ajax('/tweets/', { method: 'POST' })
//     .then(function (morePostsHtml) {
//       console.log('Success: ', morePostsHtml);
//       $button.replaceWith(morePostsHtml);
//     });
//   });
// });