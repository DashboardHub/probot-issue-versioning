require.include('probot');
require('file-loader?name=private-key.pem!./private-key.pem')

const fs = require('fs')
const cert = fs.readFileSync('private-key.pem', 'utf8')

const createProbot = require('./probot');
const probot = createProbot({
  id: process.env.APP_ID,
  secret: process.env.WEBHOOK_SECRET,
  cert: cert,
  port: 0
});

probot.load(require('./plugin'));

module.exports.probotHandler = function (event, context, callback) {
  const e = event.headers['x-github-event'] || event.headers['X-GitHub-Event'];

  event.body = (typeof event.body === 'string') ? JSON.parse(event.body) : event.body;

  try {
    probot.robot.webhook.emit(e, {
      event: e,
      id: event.headers['x-github-delivery'] || event.headers['X-GitHub-Delivery'],
      payload: event.body
    });

    const res = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Executed'
      })
    }
    callback(null, res);
  } catch (err) {
    console.log(err);
    callback(err)
  }
}
