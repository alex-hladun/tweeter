/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  loadTweets();

  $("#submit-tweet-form").submit(function (event) {
    event.preventDefault();

    const payload = $(this).serialize();
    const tweetToPost = $('#tweet-text').val();
    if (tweetToPost.length === 0) {
      window.alert("This tweet is empty");
    } else if (tweetToPost.length > 140) {
      window.alert("This tweet is too long!");
    } else {
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: payload,
      })
        .then(function(data) {
          console.log("Data posted to tweet database.");
          console.log(data);
          loadLatestTweet();
        });

    }
  }
  );
});

const createTweetElement = (tweetData) => {

  

  

  let date1 = new Date();
  let date2 = tweetData.created_at;
  let differenceInTime = date1.getTime() - date2;
  let differenceInDays = (differenceInTime / (1000 * 2600 * 24)).toFixed(0);
  const differenceInYears = Math.floor(differenceInDays / 365);
  let dateStr;
  if (differenceInDays > 365) {
    dateStr = differenceInYears + " years ago";
  } else {
    dateStr = differenceInDays + " days ago";
  }
  console.log("diff in days", differenceInDays);
  const $tweet = $(`<article class="tweet">
  <header>
    <div class="tweet-info-group">
      <img class="tweet-profile-picture" src="${tweetData.user.avatars}">
      <span>${tweetData.user.name}</span>
    </div>
    <div class="tweetinfo-group tweet-username">
      <span class="username">${tweetData.user.handle}</span>
    </div>
  </header>
  <section>
    <span>${escape(tweetData.content.text)}</span>
  </section>
  <footer>
    <div class="tweet-info-group">
      <span>${`${dateStr}`}</span>
    </div>
    <div class="tweetinfo-group">
      <span class="symbols">❤︎ ⚐ ♺</span>

  </footer>
</article>`);
  return $tweet;
};

const renderTweets = (tweets) => {
  console.log(tweets);
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweet-container').append($tweet);
  }
};

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      console.log('Success: ', data);
      const tweetArray = [];
      for (const obj of data) {
        tweetArray.push(obj);
      }
      renderTweets(tweetArray);

      $("article.tweet").hover(function () {
        let username = $(this).children('header').children()[1];
        $(username).toggle();
      }, function () {
        let username = $(this).children('header').children()[1];
        $(username).toggle();
      });
    });
};

const escape =  function(str) {
  let div = document.createElement('span');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const loadLatestTweet = () => {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      console.log('Success: ', data);
      const tweetArray = [];

      // const keys = Object.keys(data);
      // const last = keys[keys.length-1];

      let x = 0;
      for (const obj of data) {
        if (x === data.length - 1) {
          tweetArray.push(obj);
        }
        x++;
      }
      renderTweets(tweetArray);
    });
};




