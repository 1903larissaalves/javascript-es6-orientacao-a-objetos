class NegociacaoService{

    constructor(){
        this.http = new HttpService();
    }

    getNegociacaoSemana(){
        
        return new Promise((resolve, reject) => {

        this.http
            .get('negociacoes/semana')
            .then(negociacoes => {
                console.log(negociacoes);
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

            })
            .catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana.');
             })
        });
    }

    getNegociacaoSemanaAnterior(){
        
        return new Promise((resolve, reject) => {

        this.http
            .get('negociacoes/anterior')
            .then(negociacoes => {
                console.log(negociacoes);
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

            })
            .catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana anterior');
             })
        });
    }

    getNegociacaoSemanaRetrasada(){

        return new Promise((resolve, reject) => {

            this.http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana retrasada.');
                 })
            });
        
    }

    getNegociacoes() {
        
        return Promise.all([
            this.getNegociacaoSemana(),
            this.getNegociacaoSemanaAnterior(),
            this.getNegociacaoSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
    } 
    
}