const jsdiff = require('diff');

module.exports = function(robot) {
  robot.on('issues.edited', async context => {
    const github = await robot.integration.asInstallation(context.payload.installation.id);

    let type = /VERSION_TYPE_PLAIN/.test(context.payload.issue.body) ? 'plain' : 'diff';
    let space = '\n\n';
    let title = '**Issue** description updated by `' + context.payload.sender.login + '`. Previous version was...';
    let body = '';
    let footer = `...version ${process.env.VERSION}`;

    switch(type) {
      case 'diff':
        let diff = jsdiff.diffLines(context.payload.changes.body.from, context.payload.issue.body, { ignoreWhitespace: true });
        let prepend = '';
        let output = '';
        diff.forEach((line) => {
          prepend = '';
          if (line.added) { prepend = '+'; }
          if (line.removed) { prepend = '-'; }
          output += prepend + ' ' + line.value;
        });

        body = '```diff\n' + output + '\n```';
        break;
      case 'plain':
      default:
        body = context.payload.changes.body.from;
        break;
    }

    return github.issues.createComment(
      context.issue(
        {
          body: `${title} ${space} --- ${space} ${body} ${space} --- ${space} ${footer} ${space}`
        }
      )
    );
  });
}
