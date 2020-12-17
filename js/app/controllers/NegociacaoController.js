class NegociacaoController{

    constructor(){
        
        let $ = document.querySelector.bind(document);

        this._data = $("#data");
        this._quantidade = $("#quantidade");
        this._valor = $("#valor");

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacaoView($("#negociacoesView")),
            'adiciona', 'apagaNegociacoes', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            'texto');

        this._ordemAtual = '';

        this._init();
        
    }

    _init(){

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => negociacoes.forEach(negociacao =>
                this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro =>{
                console.log("Erro " + erro);
                this._mensagem.texto = error;
            });

            setInterval(() =>{
                this.importaNegociacoes();
            }, 4000);
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

    importaNegociacoes(){
        let service = new NegociacaoService();
        service
            .getNegociacoes()
            .then(negociacoes => 
                negociacoes.filter(negociacao =>
                    !this._listaNegociacoes.negociacoes.some(negociacaoExistente => JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
            )
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas.'   
            }))
            .catch(erro => this._mensagem.texto = erro);   
    }

    apaga(){

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaLista())
            .then(mensagem =>{

                this._mensagem.texto = mensagem;
                this._listaNegociacoes.apagaNegociacoes();
            })
            .catch(erro => this._mensagem.texto = erro);
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

    ordena(coluna) {
        
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem(); 
        } else {
            this._listaNegociacoes.ordena((p, s) => p[coluna] - s[coluna]);    
        }
        this._ordemAtual = coluna;    
    }

}