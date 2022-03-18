export class Animal {
    constructor (
        public id: number, 
        public name: string, 
        public yearOfBirth: number, 
        public shortInfo: string, 
        public longInfo: string,
        public imgUrl: string,
        public isFed: boolean,
        public lastFed: string 
        ) {}
}