// LIBRARIES 

// import Swal from 'sweetalert2';
// const Swal = require('sweetalert2');

// CLASSES

class Poly2 {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    getA() { return this.a; }
    getB() { return this.b; }
    getC() { return this.c; }

    setA(a) { this.a = a; }
    setB(b) { this.b = b; }
    setC(c) { this.c = c; }
}


class Roots {
    constructor(x1, x2) {
        this.x1 = x1;
        this.x2 = x2;
    }

    getX1() { return this.x1; }
    getX2() { return this.x2; }

    setX1() { this.x1 = x1; }
    setX2() { this.x2 = x2; }

    printRoots() { return "x1 = " + this.x1 + " ; x2 = " + this.x2; }
}



// FUNCTIONS

/**
 * Calcula el discriminante de un polinomio cuadrático.
 * @param {object} poly2Obj - Instancia de la clase Poly2.
 * @returns {number} - Discriminante del polinomio cuadrático.
 */
const discriminante = (poly2Obj) => Math.pow(poly2Obj.getB(), 2) - (4 * poly2Obj.getA() * poly2Obj.getC());


/**
 * Calcula las raíces complejas de un polinomio cuadrático.
 * @param {number} a - Constante a del polinomio cuadrático.
 * @param {number} b - Constante b del polinomio cuadrático.
 * @param {number} disc - Discriminante del polinomio cuadrático (negativo).
 * @returns {object} - Instancia de la clase Roots.
 */
function complexRoots(a, b, disc) {
    let firstTerm = (-b / (2 * a));
    let secondTerm = (Math.sqrt(-disc) / (2 * a));
    let x1 = firstTerm + " + " + secondTerm + "i";
    let x2 = firstTerm + " - " + secondTerm + "i";
    if (secondTerm < 0) { // Inversión de signo
        x1 = firstTerm + " - " + -secondTerm + "i";
        x2 = firstTerm + " + " + -secondTerm + "i";
    }
    if (firstTerm === 0) { // Mejora la presentación del resultado
        x1 = secondTerm + "i";
        x2 = " - " + secondTerm + "i";
        if (secondTerm < 0) { // Inversión de signo
            x1 = " - " + -secondTerm + "i";
            x2 = " + " + -secondTerm + "i";
        }
    }
    const rootsObj = new Roots(x1, x2);
    return rootsObj
}


/**
 * Calcula las raíces reales repetidas de un polinomio cuadrático.
 * @param {number} a - Constante a del polinomio cuadrático.
 * @param {number} b - Constante b del polinomio cuadrático.
 * @returns {object} - Instancia de la clase Roots.
 */
function realRepeatedRoots(a, b) {
    let root = (-b / (2 * a));
    const rootsObj = new Roots(root, root);
    return rootsObj
}


/**
 * Calcula las raíces reales distintas de un polinomio cuadrático.
 * @param {number} a - Constante a del polinomio cuadrático.
 * @param {number} b - Constante b del polinomio cuadrático.
 * @param {number} disc - Discriminante del polinomio cuadrático (positivo).
 * @returns {object} - Instancia de la clase Roots.
 */
function realDistinctRoots(a, b, disc) {
    let x1 = ((-b + Math.sqrt(disc)) / (2 * a));
    let x2 = ((-b - Math.sqrt(disc)) / (2 * a));
    const rootsObj = new Roots(x1, x2);
    return rootsObj;
}


/**
 * Determina el tipo de raíces de un polinomio cuadrático y las calcula.
 * @param {object} poly2Obj - Instancia de la clase Poly2.
 * @returns {string}
 */
function resolvente(poly2Obj) {
    let message = "";
    let rootsObj = new Roots();
    let disc = discriminante(poly2Obj);
    if (disc < 0) {
        message = "Raíces complejas: ";
        rootsObj = complexRoots(poly2Obj.getA(), poly2Obj.getB(), disc);
    } else if (disc === 0) {
        message = "Raices reales repetidas: ";
        rootsObj = realRepeatedRoots(poly2Obj.getA(), poly2Obj.getB());
    } else {
        message = "Raices reales distintas: ";
        rootsObj = realDistinctRoots(poly2Obj.getA(), poly2Obj.getB(), disc);
    }
    let results = document.querySelector("#results");
    localStorage.setItem("message", JSON.stringify(message));
    localStorage.setItem("x1", JSON.stringify(rootsObj.getX1()));
    localStorage.setItem("x2", JSON.stringify(rootsObj.getX2()));
    results.innerHTML = `<p>${message}</p>`;
    results.innerHTML += `<p>x1: ${rootsObj.getX1()}</p>`;
    results.innerHTML += `<p>x2: ${rootsObj.getX2()}</p>`;

    Toastify({
        text: "Raíces del polinómio cuadrático calculadas con éxito",
        duration: 3000
    }).showToast();
}


const constantValidation = (a, b, c) => {
    valid = true;
    let constants = [a, b, c];
    let results = document.querySelector("#results");
    for (let i = 0; i < constants.length; i++) {
        data = parseFloat(constants[i]);
        if (isNaN(data)) {

            message = "Las constantes deben ser valores numéricos.";

            Swal.fire({
                title: '¡Error!',
                text: message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })

            results.innerHTML = `<p>${message}</p>`
            valid = false;
            break;
        } else if (i == 0 && data === 0) {
            message = "La constante A debe ser distinta de cero.";

            Swal.fire({
                title: '¡Error!',
                text: message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })

            results.innerHTML = `<p>${message}</p>`
            valid = false;
            break;
        }
    }
    return valid;
}


function cuadratico(a, b, c) {
    if (constantValidation(a, b, c)) {
        localStorage.setItem("a", JSON.stringify(a));
        localStorage.setItem("b", JSON.stringify(b));
        localStorage.setItem("c", JSON.stringify(c));
        const poly2Obj = new Poly2(parseFloat(a), parseFloat(b), parseFloat(c));
        resolvente(poly2Obj);
    }
}


const getConstants = () => {
    let results = document.querySelector("#results");
    results.innerHTML = "";
    let a = document.querySelector('#constant-a').value;
    let b = document.querySelector('#constant-b').value;
    let c = document.querySelector('#constant-c').value;
    cuadratico(a, b, c);
}


const main = () => {
    let constantA = document.querySelector("#constant-a");
    let constantB = document.querySelector("#constant-b");
    let constantC = document.querySelector("#constant-c");
    constantA.value = JSON.parse(localStorage.getItem("a"));
    constantB.value = JSON.parse(localStorage.getItem("b"));
    constantC.value = JSON.parse(localStorage.getItem("c"));

    let examples = document.querySelector("#examples");

    // API
    const apiUrl = '../api/api.json';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(constants => {
                examples.innerHTML += `<p>a: ${constants.a} | b: ${constants.b} | c: ${constants.c}</p>`;
            });
        })
        .catch(error => {
            console.error('Hubo un error al obtener los datos:', error);
        });

    let results = document.querySelector("#results");
    let message = JSON.parse(localStorage.getItem("message"));
    let x1 = JSON.parse(localStorage.getItem("x1"));
    let x2 = JSON.parse(localStorage.getItem("x2"));
    results.innerHTML = `<p>${message}</p>`;
    results.innerHTML += `<p>x1: ${x1}</p>`;
    results.innerHTML += `<p>x2: ${x2}</p>`;

    let calcular = document.querySelector("#calcular");
    calcular.addEventListener("click", getConstants);
};


main();




