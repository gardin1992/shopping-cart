export interface IProduct {
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    title: string,
}

export default class Product {
    title: string;
    id: number;

    constructor(title: string, id: number) {
        this.title = title;
        this.id = id;
    }
}
