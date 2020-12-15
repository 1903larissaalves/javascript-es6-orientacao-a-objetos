class NegociacaoController{

    constructor(){
        
        let $ = document.querySelector.bind(document);

        this._data = $("#data");
        this._quantidade = $("#quantidade");
        this._valor = $("#valor");

        this._listaNegociacoes = new ListaNegociacoes();
        this._negociacoesView = new NegociacaoView($("#negociacoesView"));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagemView.update(this._mensagem);


    }

    adiciona(event){

        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.texto = "Negociação adicionada com sucesso!";
        this._mensagemView.update(this._mensagem);
        this._limpaFormulario();
        
    }

    apaga(){
        this._listaNegociacoes.apagaNegociacoes();
        this._negociacoesView.update(this._listaNegociacoes);
        this._mensagem.texto = "Negocições apagadas com sucesso!";
        this._mensagemView.update(this._mensagem);
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