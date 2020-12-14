class NegociacaoController{

    constructor(){
        
        let $ = document.querySelector.bind(document);

        this._data = $("#data");
        this._quantidade = $("#quantidade");
        this._valor = $("#valor");
        this._listaNegociacoes = new ListaNegociacoes();
    }

    adiciona(event){

        event.preventDefault();

      
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._limpaFormulario();
        console.log(this._listaNegociacoes.getNegociacoes());
        
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