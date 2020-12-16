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
        let service = new NegociacaoService();
        let self = this;
        service.getNegociacaoSemana(function(erro, negociacoes){

            if (erro) {
                self._mensagem.texto = erro;
                return;
            }

            negociacoes.forEach(negociacao => self._listaNegociacoes.adiciona(negociacao));
            self._mensagem.texto = "Negociação importada com sucesso!";

        });*/

        let service = new NegociacaoService();

        service.getNegociacaoSemana()
        .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
            this._mensagem.texto = 'Negociações da semana obtidas com sucesso';
        })
        .catch(erro => this._mensagem.texto = erro);

        service.getNegociacaoSemanaAnterior()
        .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
            this._mensagem.texto = 'Negociações da semana obtidas com sucesso';
        })
        .catch(erro => this._mensagem.texto = erro);

        service.getNegociacaoSemanaRetrasada()
        .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
            this._mensagem.texto = 'Negociações da semana obtidas com sucesso';
        })
        .catch(erro => this._mensagem.texto = erro);
        
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