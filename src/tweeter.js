
module.exports = class Tweeter {
    constructor(connection) {
        this.connection = connection;
    }
    async tweet(bodyText) {
        if (!this.connection) {
            console.log("Cannot tweet: '" + bodyText + "'; Tweeter is not initialised");
            return false;
        }
        console.log("Attempting to tweet: '" + bodyText + "'...");
        try {
            await this.connection.post("statuses/update", {
                "status": bodyText.slice(0, 288)
            });
            console.info("Sent tweet successfully");
            return true;
        } catch (err) {
            console.error("Failed to send tweet", err);
            return false;
        }
    }
};
