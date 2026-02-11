let inputTexto = document.querySelector(".input-texto"); /* seleciona o elemento HTML com a classe "input-texto" e armazena em uma variável chamada inputTexto */

let tradução = document.querySelector(".tradução"); /* seleciona o elemento HTML com a classe "tradução" e armazena em uma variável chamada tradução */

let idioma = document.querySelector(".idioma"); /* seleciona o elemento HTML com a classe "idioma" e armazena em uma variável chamada idioma */

async function traduzir() { /* define uma função chamada traduzir que será executada quando o usuário clicar no botão de tradução */
    console.log(inputTexto.value)

    let endereco = "https://api.mymemory.translated.net/get?q=" + inputTexto.value + "&langpair=pt-br|" + idioma.value; /* cria uma variável chamada endereco que contém a URL da API de tradução, concatenando o valor do inputTexto e os parâmetros de idioma */


    let resposta = await fetch(endereco) /* faz uma requisição HTTP para a URL armazenada em endereco e armazena a resposta em uma variável chamada resposta */

    let dados = await resposta.json() /* converte a resposta para o formato JSON e armazena em uma variável chamada dados */

    tradução.innerHTML = dados.responseData.translatedText /* atualiza o conteúdo HTML do elemento tradução com o texto traduzido obtido dos dados da resposta */

    console.log(dados) /* exibe os dados no console para depuração */
}

function ouvir() { /* define uma função chamada ouvir que será executada quando o usuário clicar no botão de ouvir */

    let speech = window.webkitSpeechRecognition /* verifica se o navegador suporta a API de reconhecimento de voz e atribui a classe apropriada à variável webkitSpeechRecognition */

    let reconhecimento = new speech() /* cria uma nova instância da classe de reconhecimento de voz e armazena em uma variável chamada reconhecimento */

    reconhecimento.lang = "pt-BR" /* define o idioma do reconhecimento de voz para português do Brasil */

    reconhecimento.onresult = (evento) => { /* define uma função de callback que será executada quando o reconhecimento de voz retornar um resultado */
        let transcrição = evento.results[0][0].transcript /* extrai o texto reconhecido do evento e armazena em uma variável chamada resultado */
        inputTexto.textContent = transcrição /* atualiza o valor do elemento inputTexto com o texto reconhecido */

        traduzir() /* chama a função traduzir para traduzir o texto reconhecido */
    }

    reconhecimento.start() /* inicia o processo de reconhecimento de voz */
}