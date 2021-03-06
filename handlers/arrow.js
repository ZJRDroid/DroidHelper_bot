const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController;

const BotUtils = require('../utils')

class ArrowController extends TelegramBaseController {

    triggerCommand($) {
        BotUtils.getRomFilter($, this.searchBuild)
    }

    searchBuild($) {

        if (!$.command.success || $.command.arguments.length === 0) {
            $.sendMessage("Usage: /arrow device", {
                parse_mode: "markdown",
                reply_to_message_id: $.message.messageId
            });
            return;
        }

        var device = $.command.arguments[0];

        BotUtils.getSourceForgeBuilds($, ArrowController.romInfos(), device);

    }

    static romInfos() {
        return {
            fullName: "ArrowOS",
            extraSFPath: "arrow-9.x/{0}",
            projectName: "arrow-os",
            website: "https://www.arrowos.net/"
        }
    }

    get routes() {
        return {
            'arrowBuildHandler': 'triggerCommand',
        }
    }
}



module.exports = ArrowController;
