import * as React from 'react'

export const dbConfig = {
    DB_NAME: "shoppingCart",
    DB_VERSION: 1,
}

export const userSchema = {
    name: "users",
    uniques: ["email"]
}

export const purchaseSchema = {
    name: "purchases",
}


function IndexedDbStore() {
    const [connection, setConnection] = React.useState<IDBDatabase | null>(null)
    const IndxDB: IDBFactory = window.indexedDB

    React.useEffect(() => {
        const openRequest = IndxDB.open(dbConfig.DB_NAME, dbConfig.DB_VERSION);

        openRequest.onupgradeneeded = (e: any) => {
            // console.log('Criando ou atualizando o banco');

            var minhaConnection = e.target.result;
            minhaConnection.createObjectStore('negociacoes');

            const _connection = e.target.result;

            const userObjStore = _connection.createObjectStore(userSchema.name, { keyPath: "id", autoIncrement: true });
            userObjStore.createIndex("name", "name", { unique: false });
            userObjStore.createIndex("email", "email", { unique: true });

            _connection.createObjectStore(purchaseSchema.name, { keyPath: "id", autoIncrement: true });
        };

        openRequest.onsuccess = (e: any) => {
            console.log('Conexão realizada com sucesso');
            // e.target.result é uma instância de IDBDatabase
            setConnection(e.target.result)

            // var request = db.transaction(["clientes"], "readwrite")
            //     .objectStore("clientes")
            //     .delete(1);

            // request.onsuccess = function (event: any) {
            //     // Pronto!
            // };

            // request.onerror = function (event: any) {
            //     console.log('error', event.target.error)
            // }
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