#!/usr/bin/env node
require('dotenv').config();
require('../setting/color');
require('console.table');

const program = require('commander');
const { version } = require('../helper');
const {routes} = require('../route/routes');

// const Server = require('../Server/Server').app;
const urlAuth = 'https://slack.com/api/oauth.access';
const axios = require('axios');
// TODO Create cli application for  the entire process of obtaining a token

program
    .version(version)
    .description('Console application')
    // .command('server')
    // .option('-s, --start', 'Start server in waiting for redirect url')
    // .action(function (dir, cmd) {
    //     // TODO  check on parameter -s
    //     Server.get('/', (req, res) => {
    //         axios.get(urlAuth, {
    //             params:{
    //                 client_id: process.env.SLACK_CLIENT_ID,
    //                 client_secret: process.env.SLACK_CLIENT_SECRET,
    //                 code: req.query.code,
    //             }
    //         })
    //         .then(function (response) {
    //             console.log(response.data, 'authorize');
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    //     });
    // })
    .command('show <what>')
    .description('Show information')
    .action(function (what, options) {
        switch (what) {
            case 'events':
                let out = [];
                routes.forEach((classRoute) => {
                    let events = (new classRoute).typeEvent;

                    if (Array.isArray(events)) {
                        events.forEach((event) => {
                            out.push({
                                event:event.verbose,
                                description:'',
                            });
                        })
                    } else {
                        out.push({
                            event:events.verbose,
                            description:'',
                        });
                    }
                });
                return console.table('List events', out);
            default:
            return console.log('Not found something to show...'.warn)
        }
    });

program.parse(process.argv);

if (!program.args.length) program.help();