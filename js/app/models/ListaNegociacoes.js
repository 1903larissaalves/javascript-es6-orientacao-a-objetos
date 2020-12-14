class ListaNegociacoes{
    constructor(){

        this._negociacoes = [];
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
    }

    getNegociacoes(){
        return [].concat(this._negociacoes);
    }
}