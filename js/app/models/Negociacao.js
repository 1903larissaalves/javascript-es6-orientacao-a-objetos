class Negociacao{
      
    constructor(data, quantidade, valor){
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        
        Object.freeze(this); 
    }

    getVolume(){
        return this._quantidade * this._valor;
    }

    getData(){
        return new Date(this._data.getTime());
    }

    getQuantidade(){
        return this._quantidade;
    }

    getValor(){
        return this._valor;
    }
}