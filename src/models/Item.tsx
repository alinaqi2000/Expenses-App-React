export class Item {
    constructor(
        public id: string,
        public user_id: string,
        public title: string,
        public amount: string,
        public date: Date | string | null

    ) { }
}