const core = require('@actions/core');
const github = require('@actions/github');

try {
  const whoToGreet = core.getInput('who-to-greet') || 'Abdul Rafay';
  console.log(`Hello, ${whoToGreet}! Welcome to the GitHub Actions Certification Course.`);
  
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  core.setOutput("greeting", `Hello, ${whoToGreet}! Completed successfully at ${time}`);
  
  console.log(`Successfully executed custom JavaScript action step!`);
} catch (error) {
  core.setFailed(error.message);
}
