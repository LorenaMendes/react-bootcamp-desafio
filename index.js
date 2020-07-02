var express = require("express");
const app = express(); // cria uma cópia do módulo express inteiro
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const { Octokit } = require("@octokit/rest");
const token = ""
var api = require('./octokit');
const { json } = require("body-parser");

// Config
    // Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars'); // define quem vai ser a template engine
    // Body Parser
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

// Rotas
app.get('/', function(req, res){
    res.render('formulario');
})

app.post('/search', async function(req, res){
    // Pega todos os repositórios para o usuário recebido via POST
    const repos = await api.getReposByUser(req.body.user);

    // Gera um array com todos os nomes de repositórios
    const repo_names = [];
    for(var x in repos) repo_names.push(repos[x]['name']);

    // Renderiza a view repos.handlebars com os parâmetros passados no dicionário
    res.render('repos', {repos: repo_names, user: req.body.user});
})

app.post('/detail', async function(req, res){
    // Dicionário de contexto para a view
    const context = {}

    // Recebe os repositórios e filtra pelo repositório em questão
    const repos = await api.getReposByUser(req.body.user);
    var specificRepo = repos.filter(function(repo) {
        return repo.name == req.body.repo;
    });

    // Coloca as informações de interesse no dicionário
    context['user'] =       req.body.user;
    context['repo'] =       specificRepo[0].name;
    context['user_info'] =  specificRepo[0]['owner'];
    context['pic'] =        specificRepo[0]['owner']['avatar_url'];


    // Recebe as issues daquele repositório
    const rawIssues = await api.getIssuesByRepo(req.body.user, req.body.repo);
    const issues = {};
    for(var x in rawIssues.data)
        issues[rawIssues.data[x].title] = rawIssues.data[x].state
    context['issues'] = issues;

    res.render('details', context);

})

app.listen(8081); // última linha do código