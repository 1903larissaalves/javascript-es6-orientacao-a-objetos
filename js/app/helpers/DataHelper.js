class DataHelper{

    constructor(){
        throw new Error("DataHelper não pode ser instanciada");
    }

    static textoParaData(texto){
        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    }




}