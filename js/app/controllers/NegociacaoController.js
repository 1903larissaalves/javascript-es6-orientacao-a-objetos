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

        ConnectionFactory
            .getConnection()
            .then(connection =>{
                new NegociacaoDao(connection)
                    .listaTodos()
                    .then(negociacoes =>{
                        negociacoes.forEach(negociacao =>{
                            this._listaNegociacoes.adiciona(negociacao);
                        });
                    });
            });

    }

    adiciona(event){

        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then((connection) =>{

                let negociacao = this._criaNegociacao();

                new NegociacaoDao(connection)
                .adiciona(negociacao)
                .then(() =>{
                    this._listaNegociacoes.adiciona(negociacao);

                    this._mensagem.texto = "Negociação adicionada com sucesso!";
        
                    this._limpaFormulario();
                })
                .catch(erro =>{
                    this._mensagem.texto = erro;
                });
            });
    }

    importanegociacoes(){
       
        let service = new NegociacaoService();

        Promise.all([
            service.getNegociacaoSemana(),
            service.getNegociacaoSemanaAnterior(),
            service.getNegociacaoSemanaRetrasada()]
        ).then(negociacoes => {
            negociacoes
            .reduce((arrayReduzido, array) => arrayReduzido.concat(array), [])
            .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso';
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
            parseInt(this._quantidade.value),
            parseFloat(this._valor.value));
    }

    _limpaFormulario(){
        this._data.value = '';
        this._quantidade.value = 1;
        this._valor.value = 0.0;

        this._data.focus();
    }

}