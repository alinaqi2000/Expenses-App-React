export class User {
    constructor(
        public id: string = "",
        public name: string = "",
        public email: string = "",
        public password: string = "",
        public image_url: string = "https://camo.githubusercontent.com/b35177d7f35620432f990d05b85c2c7b989951cff6a4195e983851f45dc98c14/68747470733a2f2f696d672e69636f6e73382e636f6d2f706c6173746963696e652f32782f757365722e706e67",
        public token: string = "",
        public created_at: string = ""
    ) { }
}