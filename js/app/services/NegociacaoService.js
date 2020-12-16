class NegociacaoService{

    getNegociacaoSemana(callback){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');
        xhr.onreadystatechange  = () =>{
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    callback(null, JSON.parse(xhr.responseText)
                        .map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    console.log("sucesso");
                    console.log(xhr.responseText);
                }else{
                    callback("Não foi possível obter as negociacoes do servidor", null);
                    console.log(xhr.responseText);
 
                }
            }
        }
 
        xhr.send();
    }
      
}