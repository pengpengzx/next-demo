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

  console.log(owner, repo, octokit);
  // const res = await octokit.request('POST /repos/:owner/:repo/issues/:issue_number/comments', {
  //   owner,
  //   repo,
  //   issue_number,
  //   body: `Hello ${nameToGreet}! Time is ${time}`
  // });
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
  console.log(res)
} catch (error) {
  core.setFailed(error.message);
}