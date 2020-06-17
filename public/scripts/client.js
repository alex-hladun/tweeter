/* eslint-disable no-undef */

$(document).ready(function() {
  loadTweets();

  $("#submit-tweet-form").submit(function(event) {
    event.preventDefault();
    const payload = $(this).serialize();
    const tweetToPost = $('#tweet-text').val();
    if (tweetToPost.length === 0) {
      $("#error-message").text("Your tweet is empty!");
      $("#error-message").slideDown("slow", function() {
      });
    } else if (tweetToPost.length > 140) {
      $("#error-message").text("Your tweet is too long!");
      $("#error-message").slideDown("slow", function() {
      });
    } else {
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: payload,
      })
        .then(function() {
          $("#error-message").slideUp("slow", function() {
          });
          $('#tweet-text').val("");
          $('#char-counter').val('140');
          loadLatestTweet();
        });
    }
  }
  );

  // FAB button
  $('button.back-to-tweet-compose').click(function() {
    $("#compose-tweet-form").slideDown("slow", function() {
    });
    $("#error-message").slideUp("slow", function() {
    });
    $("#tweet-text").focus();
  });

  // Slide-down for compose tweet.
  $("a.write-text").click(function(event) {
    event.preventDefault();
    $("#compose-tweet-form").slideToggle("slow", function() {
    });
    $("#error-message").slideUp("slow", function() {
    });
    $("#tweet-text").focus();
  });

  // Toggle FAB if not in desktop mode.
  specifyFab();
  $(window).on('resize', function() {
    specifyFab();
  });
  $(window).scroll(function() {
    specifyFab();
  });
});

const specifyFab = () => {
  if ($(window).width() < 1024) {
    const amountScrolled = 190;
    if ($(window).scrollTop() > amountScrolled) {
      // FAB
      $('button.back-to-tweet-compose').addClass("show");
      // Text
      $('a.write-text').addClass("hide");
      $('#tweeter-text').addClass('float');
    } else {
      $('button.back-to-tweet-compose').removeClass("show");
      $('a.write-text').removeClass("hide");
      $('#tweeter-text').removeClass('float');
    }
  } else {
    $('#tweeter-text').removeClass('float');
    $('button.back-to-tweet-compose').removeClass("show");
    $('a.write-text').removeClass("hide");
  }
};

const createTweetElement = (tweetData) => {
  const date1 = new Date();
  const date2 = tweetData.created_at;
  const differenceInTime = date1.getTime() - date2;
  const differenceInDays = (differenceInTime / (1000 * 3600 * 24));
  const differenceInYears = Math.floor(differenceInDays / 365);
  const differenceInHours = (differenceInDays * 24);
  const differenceInMinutes = (differenceInHours * 60);
  const differenceInSeconds = (differenceInMinutes * 60);
  let dateStr;
  if (differenceInDays > 365) {
    dateStr = differenceInYears.toFixed(0) + " years ago";
  } else if (differenceInSeconds < 60) {
    dateStr = differenceInSeconds.toFixed(0) + " seconds ago";
  } else if (differenceInMinutes < 60) {
    dateStr = differenceInMinutes.toFixed(0) + " minutes ago";
  } else if (differenceInHours < 24) {
    dateStr = differenceInHours.toFixed(0) + " hours ago";
  } else {
    dateStr = differenceInDays.toFixed(0) + " days ago";
  }
  const $tweet = $(`<article class="tweet">
  <header>
    <div class="tweet-info-group">
      <img alt="tweet profile pic"class="tweet-profile-picture" src="${tweetData.user.avatars}">
      <span>${tweetData.user.name}</span>
    </div>
    <div class="tweetinfo-group tweet-username">
      <span class="username">${tweetData.user.handle}</span>
    </div>
  </header>
  <section>
    <span class="tweet">${escape(tweetData.content.text)}</span>
  </section>
  <footer>
    <div class="tweet-info-group">
      <span>${dateStr}</span>
    </div>
    <div class="tweetinfo-group">
      <span class="symbols">❤︎ ⚐ ♺</span>
  </footer>
</article>`);
  return $tweet;
};

const applyUsernameHover = () => {
  $("article.tweet").hover(function() {
    $(this).find('.username').show();
  }, function() {
    $(this).find('.username').hide();
  });
};

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweet-container').append($tweet);
  }
};

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
    .then(function(data) {
      const tweetArray = [];
      for (const obj of data) {
        tweetArray.push(obj);
      }
      renderTweets(tweetArray);
      applyUsernameHover();
    });
};

const escape = function(str) {
  let div = document.createElement('span');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const loadLatestTweet = () => {
  $.ajax('/tweets', { method: 'GET' })
    .then(function(data) {
      const tweetArray = [];
      let x = 0;
      for (const obj of data) {
        if (x === data.length - 1) {
          tweetArray.push(obj);
        }
        x++;
      }
      renderTweets(tweetArray);
      applyUsernameHover();
    });
};