var express = require("express");
const app = express(); // cria uma cópia do módulo express inteiro
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const { Octokit } = require("@octokit/rest");
const token = ""

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

app.post('/search', function(req, res){
    var user = req.body.user;
    // res.render('teste', {user: user});

    const octokit = new Octokit({
        auth: token,
    });
    octokit.repos
        .listForUser({
            username: user,
        })
        .then(({ data }) => {
            // handle data
            const repos = [];
            for(var x in data){
                repos.push(data[x]['name']);
            }
            res.render('repos', {repos: repos, user: user});
        });
})

app.post('/detail', function(req, res){
    var context = {};
    const octokit = new Octokit({
        auth: token,
    });
    octokit.repos
        .listForUser({
            username: req.body.user,
        })
        .then(({ data }) => {
            // Filtra o JSON resultante para achar o repositório desejado
            var arrFound = data.filter(function(item) {
                return item.name == req.body.repo;
            });
            
            context['user'] = req.body.user;
            context['repo'] = req.body.repo;
            context['user_info'] = arrFound[0]['owner'];
            context['pic'] = arrFound[0]['owner']['avatar_url'];

            octokit.paginate(octokit.issues.listForRepo, {
                owner: req.body.user,
                repo: req.body.repo
            })
            .then(issues => {
                // issues is an array of all issue objects
                var openIssues = [];
                var closedIssues = [];
                for(var x in issues){
                    if(issues[x]['state'] == 'open'){
                        console.log("Issue" + issues[x]['id'] + "ABERTA");
                        openIssues.push(issues[x]['title']);
                    }
                    else{
                        console.log("Issue" + issues[x]['id'] + "FECHADA");
                        closedIssues.push(issues[x]['title']);
                    }
                }
                context['openIssues'] = openIssues;
                context['closedIssues'] = closedIssues;
                res.render('details', context);
            })
        });
})

app.listen(8081); // última linha do código