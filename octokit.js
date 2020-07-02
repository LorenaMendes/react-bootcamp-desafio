const { Octokit } = require("@octokit/rest");
const token = '';

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
