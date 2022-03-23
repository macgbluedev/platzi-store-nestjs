const myName = 'Nicolas';
const myAge = 12;
const suma = (a: number, b: number) => {
  return a + b;
};

suma(14, 14);

class Person {
  //private age;
  //public name; //public for default

  constructor(private age: number, private name: string) {}

  getSummary() {
    return `My name is ${this.name}, ${this.age}`;
  }
}

const jose = new Person(15, 'jose');
jose.getSummary();
