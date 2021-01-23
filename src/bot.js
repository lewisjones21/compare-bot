
const Twit = require("twit"),
      twitConnection = new Twit({
          "consumer_key": process.env.TWITTER_CONSUMER_KEY,
          "consumer_secret": process.env.TWITTER_CONSUMER_SECRET,
          "bearer_token": process.env.BEARER_TOKEN,
          "access_token": process.env.TWITTER_ACCESS_TOKEN,
          "access_token_secret": process.env.TWITTER_ACCESS_TOKEN_SECRET
      });

const Tweeter = require("./tweeter.js");

module.exports = class Bot {
    constructor() {
        this.active = false;
        this.tweeter = new Tweeter(twitConnection);
    }
    start() {
        if (this.active === false) {
            this.active = true;
            return true;
        }
        return false;
    }
    stop() {
        if (this.active === true) {
            this.active = false;
            return true;
        }
        return false;
    }
    async sendTweet(message) {
        if (await this.tweeter.tweet(message)) {
            return true;
        }
        return false;
    }
    static getTimeNowString() {
        const date = new Date();
        return Bot.zeroPad(date.getHours()) + ":" + Bot.zeroPad(date.getMinutes());
    }
    static zeroPad(numberString) {
        return ("0" + numberString).slice(-2);
    }
};
