class NegociacaoController{

    constructor(){
        
        let $ = document.querySelector.bind(document);

        this._data = $("#data");
        this._quantidade = $("#quantidade");
        this._valor = $("#valor");

        let self = this;

        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {

            get(target, prop, receiver) {

                if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {

                    return function(){

                    console.log(`método '${prop}' interceptado`);

                    Reflect.apply(target[prop], target, arguments);

                    self._negociacoesView.update(target);

                    }
            }

            return Reflect.get(target, prop, receiver);
        }
        });

        this._negociacoesView = new NegociacaoView($("#negociacoesView"));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagemView.update(this._mensagem);


    }

    adiciona(event){

        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = "Negociação adicionada com sucesso!";
        this._mensagemView.update(this._mensagem);
        this._limpaFormulario();
        
    }

    apaga(){

        this._listaNegociacoes.apagaNegociacoes();

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