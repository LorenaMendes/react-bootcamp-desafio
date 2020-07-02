const { Octokit } = require("@octokit/rest");
const token = 'b46e5267adc23f2a14cdc0ed70f7a1fe0aee21fb';

const octokit = new Octokit({auth: token});

module.exports = {
    getReposByUser: async function(user){
        const {data} = await octokit.repos.listForUser({username: user});
        return data;
    },

    getIssuesByRepo: async function(owner, repo){
        const issues = await octokit.issues.listForRepo({owner: owner, repo: repo});
        return issues;
    },
}