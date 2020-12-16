class NegociacaoController{

    constructor(){
        
        let $ = document.querySelector.bind(document);

        this._data = $("#data");
        this._quantidade = $("#quantidade");
        this._valor = $("#valor");

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacaoView($("#negociacoesView")),
            'adiciona', 'apagaNegociacoes');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            'texto');

    }

    adiciona(event){

        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = "Negociação adicionada com sucesso!";

        this._limpaFormulario();
        
    }

    importanegociacoes(){

        /* 
        0: requisição ainda não iniciada
        1: conexão com o servidor estabelecida
        2: requisição recebida
        3: processando requisição
        4: requisição está concluída e a resposta está pronta
        */

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');
        xhr.onreadystatechange  = () =>{
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    JSON.parse(xhr.responseText)
                        .map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                        .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

                    this._mensagem.texto = 'Negociações importadas com sucesso!';
                    console.log("sucesso");
                    console.log(xhr.responseText);
                }else{
                    console.log("Não foi possível obter as negociacoes do servidor");
                    console.log(xhr.responseText);
                    this._mensagem.texto = 'Não foi possível obter as negociações!';

                }
            }
        }

        xhr.send();
    }

    apaga(){

        this._listaNegociacoes.apagaNegociacoes();

        this._mensagem.texto = "Negociações apagadas com sucesso!";
    }

    _criaNegociacao(){
        return new Negociacao(
            DataHelper.textoParaData(this._data.value),
            this._quantidade.value,
            this._valor.value);
    }

    _limpaFormulario(){
        this._data.value = '';
        this._quantidade.value = 1;
        this._valor.value = 0.0;

        this._data.focus();
    }

}