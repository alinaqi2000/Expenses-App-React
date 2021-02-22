export class Item {
    constructor(
        public _id: string,
        public user: string,
        public title: string,
        public amount: string,
        public date: Date| string 

    ) { }
}