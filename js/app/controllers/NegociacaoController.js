class NegociacaoController{

    constructor(){
        
        let $ = document.querySelector.bind(document);

        this.data = $("#data");
        this.quantidade = $("#quantidade");
        this.valor = $("#valor");
    }

    adiciona(event){

        event.preventDefault();

        console.log(this.data.value);
        console.log(this.quantidade.value);
        console.log(this.valor.value);

        
    }

}