class NegociacaoService{

    getNegociacaoSemana(){
        return new Promise((resolve, reject) =>{

            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'negociacoes/semana');
            xhr.onreadystatechange  = () =>{
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                        console.log("sucesso");
                        console.log(xhr.responseText);
                    }else{
                        reject("Não foi possível obter as negociacoes do servidor");
                        console.log(xhr.responseText);
     
                    }
                }
            }
     
            xhr.send();
        });
        
    }

    getNegociacaoSemanaAnterior(){
        return new Promise((resolve, reject) =>{
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/anterior');
            xhr.onreadystatechange  = () =>{
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                        console.log("sucesso");
                        console.log(xhr.responseText);
                    }else{
                        reject("Não foi possível obter as negociacoes do servidor");
                        console.log(xhr.responseText);
     
                    }
                }
            }
     
            xhr.send();
        });
        
    }

    getNegociacaoSemanaRetrasada(){
        return new Promise((resolve, reject) =>{
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/retrasada');
            xhr.onreadystatechange  = () =>{
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                        console.log("sucesso");
                        console.log(xhr.responseText);
                    }else{
                        reject("Não foi possível obter as negociacoes do servidor");
                        console.log(xhr.responseText);
     
                    }
                }
            }
     
            xhr.send();
        });
        
    }


      
}