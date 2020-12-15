class Views{

    constructor(elemento){
        this._elemento = elemento;
    }

    template(){
        throw new Error("O método template tem que ser implementado nas classes filhos");
    }

    update(model){
        this._elemento.innerHTML = this.template(model);
    }

}