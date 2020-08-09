const express = require('express') //no require, vamos registrar um pedido, e o express retornará um servidor
const server = express()
const {
    pageLanding,
    study,
    giveClasses
} = require('./pages')

//configurar nunjucks 
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
    express: server, 
    noCache: true,
})

server
// configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
//rotas de aplicação
.get("/", pageLanding) //no argumento get, diremos o que do arquivo precisamos pegar, e os parênteses + seta significam ir até a função
.get("/give-classes", giveClasses) 
.get("/study", study)
.listen(5500) //o listen retorna um valor, neste caso, aonde o servidor do live server estava sendo pedido



