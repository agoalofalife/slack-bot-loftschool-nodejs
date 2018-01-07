const assert = require('assert');
const DirectMessage = require('./../../../../Messages/MessageBase/DirectMessage');
const faker = require('faker');

let randomFaker = faker.random.uuid();

let SlackBotFake = {
    getUserById: (responseUser) => {
        return new Promise((resolve, reject) => {
            if (responseUser === fakeResponse.user) {
                resolve({name:faker.name.firstName()});
            } else{
                reject();
            }

        });

    },
    postMessage: () => {
        return randomFaker;
    }
};

let fakeResponse = {
    user:faker.name.firstName,
    type:'message',
    text:faker.lorem.text(),
    channel:`${DirectMessage.firstLetter()}${faker.random.number()}`,

};

let DirectMessageObject = new DirectMessage(fakeResponse, SlackBotFake);

describe('DirectMessage', function() {
    describe('#typeEvent', function() {
        it('exist property typeEvent and return string type', function() {
            assert.equal(DirectMessageObject.typeEvent, 'message.im');
        });
    });
    describe('#firstLetter', function() {
        it('exist method firstLetter and return string letter `D`', function() {
            assert.equal(DirectMessage.firstLetter(), 'D');
        });
    });
    describe('#getResponse', function() {
        it('get text from response', function() {
            assert.equal(DirectMessageObject.getResponse, fakeResponse.text);
        });
    });
    describe('#route', function() {
        it('route true', function() {
            assert.equal(DirectMessage.route(fakeResponse), true);
        });
        it('route some message', function() {
            assert.equal(DirectMessage.route(fakeResponse.message = ''), false);
        });
    });
    describe('#reply', function() {
        it('reply', async function() {
            let result = await DirectMessageObject.reply(faker.lorem.word(), {});
            assert.equal(result, randomFaker);
        });
    });
    describe('#patternMention', function() {
        it('exist function', function() {
            assert.equal(typeof  DirectMessageObject.patternMention === 'function', true);
        });
    });
    describe('#isMention', function() {
        it('exist function', function() {
            assert.equal(typeof  DirectMessageObject.isMention === 'function', true);
        });
    });
});