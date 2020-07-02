const { Octokit } = require("@octokit/rest");
const token = 'b46e5267adc23f2a14cdc0ed70f7a1fe0aee21fb';

const octokit = new Octokit({auth: token});

module.exports = {
    getReposByUser: async function(user){
        const {data} = await octokit.repos.listForUser({username: user});
        
        const repos = [];
        for(var x in data){
            repos.push(data[x]['name']);
        }
        return repos;
    }
}