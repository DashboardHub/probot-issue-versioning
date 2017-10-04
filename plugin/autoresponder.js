module.exports = function(robot) {
  robot.on('issues.edited', async context => {
    const github = await robot.integration.asInstallation(context.payload.installation.id);
    return github.issues.createComment(
      context.issue(
        {
          body: '**Issue** description updated by `' + context.payload.sender.login + '`. Previous version was...\n\n' +
            '---\n\n' +
            context.payload.changes.body.from + '\n\n' +
            '---\n\n'
        }
      )
    );
  });
}
