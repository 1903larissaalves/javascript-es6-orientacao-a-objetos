var ConnectionFactory = (function () {
  
    const stores = ['negociacoes'];
    const version = 4;
    const dbName = 'teste';
    var connection = null;
    var close = null;

    return class ConnectionFactory{

        constructor(){
            throw new Error("Não é possível criar instâncias de ConnectionFactory");
        }

        static getConnection(){
            return new Promise((resolve, reject) =>{
                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e =>{
                    ConnectionFactory._createStores(e.target.result);
                };

                openRequest.onsuccess = e =>{
                    resolve(e.target.result);

                    if (!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = () =>{
                            throw new Error("A conexao nao pode ser fechada diretamente");
                        }
                    }
                    
                    resolve(connection);
                };

                openRequest.onerror = e =>{
                    reject(e.target.error.name);
                };

            });
        }

        static _createStores(connection){
            stores.forEach(store =>{
                if (connection.objectStoreName.contains(store)) {
                    connection.deleteObjectStore(store);
                }

                connection.creteObjectStore(store, {autoIncrement: true});
            });
        }

        static closeConnection(){
            if (connection) {
                close();
                connection = null;
            }
        }
    }
})();