import path from "path";
import Hapi from "hapi";
import Inert from "inert";
import {hapi} from "@risingstack/graffiti";
import {getSchema} from "@risingstack/graffiti-mongoose";
import mongoose from "mongoose";
import mongooseSchema from "./data/schema";
import Filter from "bad-words";
import sha1 from "sha1";

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGOLAB_URI || 'mongodb://mongo/graphql';

mongoose.connect(MONGO_URI);

const server = new Hapi.Server();
server.connection({port: PORT});

const filter = new Filter();
const hooks = {
  mutation: {
    pre: (next, user, ...rest) => {
     console.log(user);
        console.log(user.name);
        console.log(user.hasOwnProperty('name'));
        console.log(user.email);
        console.log(user.hasOwnProperty('email'));
        console.log(user.hasOwnProperty('password'));
        console.log("details");
        console.log(user.hasOwnProperty('name') && user.hasOwnProperty('email') && !user.hasOwnProperty('password'));
        if (user.hasOwnProperty('name') && user.hasOwnProperty('email') && !user.hasOwnProperty('password')) {
            console.log("new");
            // We have a new user!!

            // generate a one time password
            user.password = sha1(Math.random() + user.name + user.email);


            var helper = require('sendgrid').mail;
            var fromEmail = new helper.Email('donotreply@sonderconnection.com');
            var toEmail = new helper.Email(user.email);
            var subject = 'Welcome to Sonder';
            var content = new helper.Content('text/plain', 'Welcome to Sonder, your initial login token is:  ' + user.password);
            var mail = new helper.Mail(fromEmail, subject, toEmail, content);

            var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
            var request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON()
            });

            sg.API(request, function (error, response) {
                if (error) {

                    console.log('Error response received');
                    console.log(response.statusCode);
                    console.log(response.body);
                    console.log(response.headers);
                }


            });


            console.log("new user");
        }
            next(user, ...rest);
        }
    }
};
server.register([Inert, {
    register: hapi,
    options: {
        schema: getSchema(mongooseSchema, {hooks})
    }
}], (err) => {
    if (err) {
        throw new Error('Failed to load a plugin: ' + err);
    }
});

// serve static files
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: path.join(__dirname, 'public'),
            redirectToSlash: true,
            index: true
        }
    }
});

server.start(() => {
    console.log('Server running at:', server.info.uri); // eslint-disable-line
});
