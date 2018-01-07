require('../helper');
const DirectMessage = require('../Messages/MessageBase/DirectMessage');
const ChannelMessage = require('../Messages/MessageBase/ChannelMessage');
const PrivateChannelOrMPDM = require('../Messages/MessageBase/PrivateChannelOrMPDM');
const MessageChangedDirect = require('../Messages/MessageSubType/MessageChangedDirect');

/**
 * Routes message
 * List classes some types message
 * @type {{}}
 */
const routes = [
    DirectMessage,
    ChannelMessage,
    PrivateChannelOrMPDM,
    // subtype
    MessageChangedDirect,
];

// check all routes and return concrete type
// return only first match
module.exports = function (message, baseBot) {
    return routes.mapIfNotNull(typeMessage => {
        return typeMessage.route(message) ? new typeMessage(message, baseBot) : null;
    }).shift();
};