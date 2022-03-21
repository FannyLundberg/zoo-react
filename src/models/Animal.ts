export class Animal {
    constructor (
        public id: number, 
        public name: string, 
        public latinName: string, 
        public yearOfBirth: number, 
        public shortInfo: string, 
        public longInfo: string,
        public imgUrl: string,
        public medicine: string,
        public isFed: boolean,
        public lastFed: string 
        ) {}
}