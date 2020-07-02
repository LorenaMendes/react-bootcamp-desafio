const { Octokit } = require("@octokit/rest");
// Token de acesso gerado no Github
const token = '';

const octokit = new Octokit({auth: token});

module.exports = {
    // Usa a API do github para retornar os repositórios por usuário
    getReposByUser: async function(user){
        const {data} = await octokit.repos.listForUser({username: user});
        return data;
    },
    
    // Usa a API do github para retornar as issues por repositório e usuário
    getIssuesByRepo: async function(owner, repo){
        const issues = await octokit.issues.listForRepo({owner: owner, repo: repo});
        return issues;
    },
}
