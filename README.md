TwitterGoogleTranslate
=========

Translate Tweets By Google | Script Greasemonkey/Tampermonkey 

## Example

#### Example: Translate to English ..

![Example to en](https://im.ezgif.com/tmp/ezgif-1-ef32e5255c10.gif)

#### Example: Translate to Arabic ..

![Example to ar](https://im.ezgif.com/tmp/ezgif-1-188aadee971a.gif)

## Installation

Before you can install any of these scripts, you must first install a user script manager for your browser; [GreaseMonkey for firefox](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) or [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo).
There are also user script managers for other browsers.
See the [Greasy Fork's page on   user script installations](https://greasyfork.org/en/help/installing-user-scripts) for more details.

---------
#### Install the Userscript in [TwitterGoogleTranslate.js](https://raw.githubusercontent.com/Saleh7/TwitterGoogleTranslate/master/TwitterGoogleTranslate.js)

## edit file

change the "ENTER-YOUR-API-KEY-HERE" for your api key  (Google Translate)

change the "en" for your language

```js
  var direction   = 'ltr'; // ltr|rtl
  var textalign   = 'left'; // left|right|center
  var apiKey      = "ENTER-YOUR-API-KEY-HERE"; // YOUR-API-KEY-HERE
  var langSource  = ""; // Detect language automatically
  var langTarget  = "en"; // The language Google will translate the text in.

```
