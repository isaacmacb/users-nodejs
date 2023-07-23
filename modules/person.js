class Person {
    constructor(name) {
        this.name = name;
    }
    sayMyName() {
        return `My name is ${this.name}`; // Corrigi "names" para "name"
    }
}

module.exports = { // Corrigi "module.export" para "module.exports"
    Person,
};
