import * as React from 'react'

function IndexedDbStore() {

    const [connection, setConnection] = React.useState<IDBDatabase | null>(null)
    const IndxDB: IDBFactory = window.indexedDB

    React.useEffect(() => {
        const openRequest = IndxDB.open('shoppingCart', 1);

        // Isso é o que os dados de nossos clientes será.
        const DadosClientes = [
            { ssn: "444-44-4444", nome: "Bill", idade: 35, email: "bill@company.com" },
            { ssn: "555-55-5555", nome: "Donna", idade: 32, email: "donna@home.org" }
        ];

        openRequest.onupgradeneeded = (e: any) => {

            console.log('Criando ou atualizando o banco');
            var minhaConnection = e.target.result;
            minhaConnection.createObjectStore('negociacoes');

            var db = e.target.result;

            // Cria um objectStore para conter a informação sobre nossos clientes. Nós vamos
            // usar "ssn" como key path porque sabemos que é único;
            var objectStore = db.createObjectStore("clientes", { keyPath: "id", autoIncrement: true });

            // Cria um índice para buscar clientes pelo nome. Podemos ter nomes
            // duplicados, então não podemos usar como índice único.
            objectStore.createIndex("nome", "nome", { unique: false });

            // Cria um índice para buscar clientes por email. Queremos ter certeza
            // que não teremos 2 clientes com o mesmo e-mail;
            objectStore.createIndex("email", "email", { unique: true });

            // Usando transação oncomplete para afirmar que a criação do objectStore
            // é terminada antes de adicionar algum dado nele.
            objectStore.transaction.oncomplete = function (event: any) {
                // Armazenando valores no novo objectStore.
                var clientesObjectStore = db.transaction("clientes", "readwrite").objectStore("clientes");
                for (var i in DadosClientes) {
                    clientesObjectStore.add(DadosClientes[i]);
                }
            }
        };

        openRequest.onsuccess = (e: any) => {
            console.log('Conexão realizada com sucesso');
            // e.target.result é uma instância de IDBDatabase
            setConnection(e.target.result)

            var db = e.target.result;
            var transaction = db.transaction(["clientes"], "readwrite");

            // Faz algo após a inserção dos dados.
            transaction.oncomplete = function (event: any) {
                alert("Pronto!");
            };

            transaction.onerror = function (event: any) {
                // Não esquecer de tratar os erros!
            };

            var objectStore = transaction.objectStore("clientes");
            for (var i in DadosClientes) {
                var request = objectStore.add(DadosClientes[i]);
                request.onsuccess = function (event: any) {
                    // event.target.result == DadosClientes[i].ssn;
                };
            }

            var request = db.transaction(["clientes"], "readwrite")
                .objectStore("clientes")
                .delete(1);

            request.onsuccess = function (event: any) {
                // Pronto!
            };

            request.onerror = function (event: any) {
                console.log('error', event.target.error)
            }
        };

        openRequest.onerror = (e: any) => {
            console.log(e.target.error);

            setConnection(null)
        };
    }, [])

    const insertData = (
        dbName: string,
        item: any,
        onSuccess?: (e: any) => void,
        onError?: (e: any) => void,
    ) => {
        if (!!connection) {
            const transaction = connection.transaction([dbName], "readwrite");
            const objectStore = transaction.objectStore(dbName);

            const request = objectStore.add(item);

            if (!!onSuccess)
                request.onsuccess = onSuccess;

            if (!!onError)
                request.onerror = onError;
        }
    }

    return {
        connection,
        insertData,
    }
}

export default IndexedDbStore