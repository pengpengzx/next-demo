const core = require('@actions/core');
const github = require('@actions/github');
import { Octokit } from "@octokit/core";

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const { owner, repo } = github.context.repo;
  const { issue_number } = github.context.issue;
  console.log(owner, repo);
  const res = await Octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
    owner: owner,
    repo: repo,
    issue_number: issue_number,
    body: 'body'
  })
  console.log(res)
} catch (error) {
  core.setFailed(error.message);
}
