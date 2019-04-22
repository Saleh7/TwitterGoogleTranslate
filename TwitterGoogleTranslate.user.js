// ==UserScript==
// @name            TwitterGoogleTranslate
// @namespace       https://github.com/Saleh7
// @author          Saleh7
// @version         1.0
// @include         https://twitter.com/*
// @connect         twitter.com
// @description     Twitter Google Translate.
// ==/UserScript==

( function ( w, d ) {
  'use strict';

  var direction   = 'ltr'; // ltr|rtl
  var textalign   = 'left'; // left|right|center
  var apiKey      = "ENTER-YOUR-API-KEY-HERE"; // YOUR-API-KEY-HERE
  var langSource  = ""; // Detect language automatically
  var langTarget  = "en"; // The language Google will translate the text in.

  var doc = query => d.querySelectorAll(query);
  const update = () => {
    let tweetNodes = Array.from(doc('li.stream-item:not([data-labeled="true"])'));
    let tweets = tweetNodes.map((tweetNode) => {
      tweetNode.setAttribute('data-labeled', 'true');
      return {
        id: tweetNode.getAttribute('data-item-id'),
        body: tweetNode.querySelector('.tweet-text').textContent
      }
    });
    // template container translation
    var translation_container_template = `
      <div class="translation-Google">
        <div class="spinner-Google" title="Loading..." style="display: none;width: 32px;height: 32px;margin: 0 auto;background: url(https://abs.twimg.com/a/1555438498/img/t1/spinners/spinner-rosetta-night-gray-32x32.gif) no-repeat 0 0;"></div>
        <div class="tweet-translation-Google" style="display: none;">
          <div class="translation-attribution-Google" style="border-top: 1px solid #38444d;" >
            <span style="color: #8899a6;font-size: 12px;">Translated by <span style="color: #f81a69;">Google</span></span>
          </div>
        <p class="tweet-translation-text-Google" id="googleID#TWEET_ID#" style="direction: `+direction+`;text-align: `+textalign+`;"></p>
        </div>
      </div>
    `;
    // template translation button
    var button_translation_template = `
      <button id='googleButton#TWEET_ID#' type="button" class="btn-link u-textUserColorHover" style="color: #8899a6;font-size: 12px;margin-right: 4px;position: relative;top: 1px;">
        <span class="Icon Icon--translator"></span> Google Translate
      </button>
    `;
    //
    if (tweets.length > 0) {
      for (let tweet of tweets) {
        let tweet_id = tweet.id;
        let tweet_text_pic = tweet.body.replace(/\bpic.twitter.com\/\w{10}\b/, '');
        let tweet_text = tweet_text_pic.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
        // console.log(tweet_id);
        let tw_id = $('*[data-tweet-id="'+tweet_id+'"]');
        // set button
        let button_template = button_translation_template.replace( /#TWEET_ID#/g, tweet_id);
        tw_id.find('.js-tweet-text-container').after(button_template);
        // set template translation
        let template = translation_container_template.replace( /#TWEET_ID#/g, tweet_id);
        tw_id.find('.js-tweet-text-container:first').after(template);
        //
        $('button#googleButton'+tweet_id+'').click(function(){
          //get tweet
          // let tweet = tw_id.find('p.TweetTextSize.TweetTextSize--normal.js-tweet-text.tweet-text').text();
          // api Google Translate
          $.ajax({
            type: "GET",
            url: "https://www.googleapis.com/language/translate/v2?key=" + apiKey + "&source=" + langSource + "&target=" + langTarget + "&q=" + encodeURIComponent(tweet_text) + "",
            dataType: 'jsonp',
            beforeSend: function() {
              // button hide
              $('button#googleButton'+tweet_id+'').hide();
              //Loading spinner show..
              tw_id.find('.spinner-Google').show();
            },
            success: function(data) {
              // show div tweet-translation-Google
              tw_id.find('.tweet-translation-Google').show();
              // hide Loading spinner
              tw_id.find('.spinner-Google').hide();
              // set Translate tweet
              $('p#googleID' + tweet_id + '.tweet-translation-text-Google').html(data.data.translations[0].translatedText);
            },
            error: function(data) {
              $('p#googleID' + tweet_id + '.tweet-translation-text-Google').text('Translatiion Failed!');
            }
          });
          console.log('click ' + tweet_id);
        });
      };
    }
  }
  //
  setInterval(update, 1000);
  //
  update();
  // startTweetObserver()
} )( window, document );
