const core = require('@actions/core');
const github = require('@actions/github');

const octokit = github.getOctokit(core.getInput('repo-token'));
try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const {
    owner,
    repo
  } = github.context.repo;
  octokit.rest.actions.getWorkflowRun({
    owner,
    repo,
    run_id: github.context.runId,
  }).then(result => {
    console.log(result.data);
  });
  octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: 1,
    body: 'test'
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
} catch (error) {
  core.setFailed(error.message);
}