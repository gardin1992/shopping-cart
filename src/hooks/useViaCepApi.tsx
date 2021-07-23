export interface IViaCepResponse {
    logradouro: string,
    bairro: string,
    localidade: string,
    uf: string,
    cep: string,
}

export interface IViaCepResponseDTO {
    postalCode: string,
    streetNumber: string,
    streetName: string,
    neighborhood: string,
    state: string,
}

function useViaCepApi() {

    const requestViaCep = async (postalCode: string) => {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${postalCode}/json/`)
            const json: IViaCepResponse = await res.json()

            return json
        } catch (err) {
            console.log(err)
        }
    }

    return {
        getByPostalCode: async (postalCode: string): Promise<any> => {
            try {
                const response = await requestViaCep(postalCode)

                if (!!response) {
                    return {
                        postalCode,
                        streetName: response.logradouro,
                        city: response.localidade,
                        neighborhood: response.bairro,
                        state: response.uf
                    }
                }
            } catch (err) {
                return false
            }
        }
    }
}

export default useViaCepApi