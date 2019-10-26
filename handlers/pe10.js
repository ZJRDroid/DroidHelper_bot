const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController;
var BotUtils = require("../utils.js")

class PETENController extends TelegramBaseController {

    triggerCommand($) {
        BotUtils.getRomFilter($, this.searchBuild)
    }

    searchBuild($) {

        var kb = {
            inline_keyboard: []
        };

        if (!$.command.success || $.command.arguments.length === 0) {
            $.sendMessage("Usage: /pe10 device", {
                parse_mode: "markdown",
                reply_to_message_id: $.message.messageId
            });
            return;
        }

        var keywords = $.command.arguments[0]

        BotUtils.getJSON("https://download.pixelexperience.org/ota_v3/" + keywords + "/ten",
            function (json, err) {

                if (err)
                    return

                if (json.filename !== "" && json.url !== "") {
                    var msg = "🔍 *PixelExperience 10.0 (Beta) build for " + keywords + "* \n";
                    msg += "*Build date*: " + BotUtils.humanDateTime(json.datetime) + "\n"
                    msg += "*File Size*: " + BotUtils.humanFileSize(json.size, true) + "\n"
                    msg += "*Maintainer*: " + json.maintainer + "\n"

                    kb.inline_keyboard.push(
                                [{
                            text: json.filename,
                            url: json.url
                                }]);

                    $.sendMessage(msg, {
                        parse_mode: "markdown",
                        reply_markup: JSON.stringify(kb),
                        reply_to_message_id: $.message.messageId
                    });
                } else {
                    $.sendMessage(tg._localization.En.deviceNotFound, {
                        parse_mode: "markdown",
                        reply_to_message_id: $.message.messageId
                    });
                }
            });
    }



    get routes() {
        return {
            'petenBuildHandler': 'triggerCommand',
        }
    }
}



module.exports = PETENController;
