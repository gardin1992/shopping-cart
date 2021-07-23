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


function useIndexedStore() {
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
            setConnection(e.target.result)

        };

        openRequest.onerror = (e: any) => {
            console.log(e.target.error);
            setConnection(null)
        };
    }, [IndxDB])

    const insertData = (
        storeName: string,
        item: any,
        onSuccess?: (e: any) => void,
        onError?: (e: any) => void,
    ) => {
        if (!!connection) {
            const transaction = connection.transaction([storeName], "readwrite");
            const objectStore = transaction.objectStore(storeName);

            const request = objectStore.add(item);

            if (!!onSuccess)
                request.onsuccess = onSuccess;

            if (!!onError)
                request.onerror = onError;
        }
    }

    const getDataById = (
        storeName: string,
        id: number,
        onSuccess?: (e: any) => void,
        onError?: (e: any) => void,
    ) => {
        if (!!connection) {
            const transaction = connection.transaction([storeName], "readwrite");
            const objectStore = transaction.objectStore(storeName);

            const request = objectStore.get(id);

            if (!!onSuccess)
                request.onsuccess = onSuccess;

            if (!!onError)
                request.onerror = onError;
        }
    }

    const getDataByIndex = (
        storeName: string,
        index: string,
        value: any,
        onSuccess?: (e: any) => void,
        onError?: (e: any) => void,
    ) => {
        if (!!connection) {
            const transaction = connection.transaction([storeName], "readwrite");
            const objectStore = transaction.objectStore(storeName);
            const myIndex = objectStore.index(index);
            const request = myIndex.get(value);

            if (!!onSuccess)
                request.onsuccess = onSuccess;

            if (!!onError)
                request.onerror = onError;
        }
    }

    const getAll = (
        storeName: string,
        onSuccess?: (e: any) => void,
        onError?: (e: any) => void,) => {
        if (!!connection) {
            const transaction = connection.transaction([storeName], "readwrite");
            const request = transaction.objectStore(storeName).getAll();

            if (!!onSuccess)
                request.onsuccess = onSuccess;

            if (!!onError)
                request.onerror = onError;
        }
    }

    const deleteById = (
        storeName: string,
        id: number,
        onSuccess: (e: any) => void,
        onError: (e: any) => void,
    ) => {
        if (!!connection) {
            const transaction = connection.transaction([storeName], "readwrite");
            const request = transaction.objectStore(storeName).delete(id);

            if (!!onSuccess)
                request.onsuccess = onSuccess;

            if (!!onError)
                request.onerror = onError;
        }
    }

    return {
        connection,
        insertData,
        getDataById,
        getDataByIndex,
        getAll,
        deleteById,
    }
}

export default useIndexedStore