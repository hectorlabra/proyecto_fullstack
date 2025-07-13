"use strict";
console.log("🚀 ¡Bienvenido al sandbox de TypeScript!");
console.log("===============================================");
console.log("\n📋 1. TIPOS BÁSICOS Y VARIABLES");
console.log("─".repeat(40));
let nombre = "Héctor";
let edad = 25;
let esDesarrollador = true;
let salario = 50000.5;
let cualquierCosa = "Puede ser cualquier cosa";
cualquierCosa = 42;
cualquierCosa = true;
let valorDesconocido = "No sabemos qué es esto";
let valorNulo = null;
let valorIndefinido = undefined;
console.log(`Nombre: ${nombre} (tipo: ${typeof nombre})`);
console.log(`Edad: ${edad} (tipo: ${typeof edad})`);
console.log(`Es desarrollador: ${esDesarrollador} (tipo: ${typeof esDesarrollador})`);
console.log(`Salario: $${salario} (tipo: ${typeof salario})`);
console.log("\n🗂️ 2. ARRAYS Y TUPLAS");
console.log("─".repeat(40));
let numeros = [1, 2, 3, 4, 5];
let frutas = ["manzana", "banana", "naranja"];
let mezcla = ["texto", 42, "otro texto", 100];
let colores = ["rojo", "verde", "azul"];
let persona = ["Juan", 30, true];
let coordenadas = [10, 20];
console.log("Números:", numeros);
console.log("Frutas:", frutas);
console.log("Mezcla:", mezcla);
console.log("Persona (tupla):", persona);
console.log("Coordenadas:", coordenadas);
console.log("\n🏗️ 3. OBJETOS E INTERFACES");
console.log("─".repeat(40));
let producto = {
    id: 1,
    nombre: "Laptop",
    precio: 999.99,
    enStock: true,
};
let usuario = {
    id: 1,
    nombre: "María García",
    email: "maria@email.com",
    activo: true,
    fechaCreacion: new Date(),
};
console.log("Producto:", producto);
console.log("Usuario:", usuario);
console.log("\n⚙️ 4. FUNCIONES");
console.log("─".repeat(40));
function sumar(a, b) {
    return a + b;
}
const multiplicar = (a, b) => a * b;
function saludar(nombre, apellido) {
    return apellido ? `Hola ${nombre} ${apellido}` : `Hola ${nombre}`;
}
function crearUsuario(nombre, activo = true) {
    return {
        id: Math.random(),
        nombre,
        email: `${nombre.toLowerCase()}@email.com`,
        activo,
        fechaCreacion: new Date(),
    };
}
function mostrarMensaje(mensaje) {
    console.log(`📢 ${mensaje}`);
}
console.log("Suma 5 + 3 =", sumar(5, 3));
console.log("Multiplicación 4 * 6 =", multiplicar(4, 6));
console.log(saludar("Juan"));
console.log(saludar("Ana", "López"));
let nuevoUsuario = crearUsuario("Pedro");
console.log("Nuevo usuario:", nuevoUsuario);
mostrarMensaje("¡Las funciones funcionan correctamente!");
console.log("\n🏷️ 5. ENUMS");
console.log("─".repeat(40));
var EstadoPedido;
(function (EstadoPedido) {
    EstadoPedido[EstadoPedido["Pendiente"] = 0] = "Pendiente";
    EstadoPedido[EstadoPedido["Procesando"] = 1] = "Procesando";
    EstadoPedido[EstadoPedido["Enviado"] = 2] = "Enviado";
    EstadoPedido[EstadoPedido["Entregado"] = 3] = "Entregado";
    EstadoPedido[EstadoPedido["Cancelado"] = 4] = "Cancelado";
})(EstadoPedido || (EstadoPedido = {}));
var TipoUsuario;
(function (TipoUsuario) {
    TipoUsuario["ADMIN"] = "admin";
    TipoUsuario["MODERADOR"] = "moderador";
    TipoUsuario["USUARIO"] = "usuario";
    TipoUsuario["INVITADO"] = "invitado";
})(TipoUsuario || (TipoUsuario = {}));
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(HttpStatus || (HttpStatus = {}));
let estadoActual = EstadoPedido.Procesando;
let tipoUsuarioActual = TipoUsuario.ADMIN;
console.log("Estado del pedido:", EstadoPedido[estadoActual]);
console.log("Tipo de usuario:", tipoUsuarioActual);
console.log("Estado HTTP OK:", HttpStatus.OK);
console.log("\n🔗 6. UNION TYPES Y TYPE ALIASES");
console.log("─".repeat(40));
let estado = "conectado";
let idUsuario = "user_123";
let idProducto = 456;
let usuarioCompleto = {
    id: "usr_789",
    nombre: "Carlos Mendoza",
    email: "carlos@email.com",
    direccion: {
        calle: "Av. Principal",
        numero: 123,
        ciudad: "Buenos Aires",
        codigoPostal: "1001",
    },
    tipo: TipoUsuario.USUARIO,
};
console.log("Estado de conexión:", estado);
console.log("ID Usuario:", idUsuario);
console.log("Usuario completo:", usuarioCompleto);
console.log("\n🏫 7. CLASES");
console.log("─".repeat(40));
class Animal {
    constructor(nombre, edad, especie) {
        this.nombre = nombre;
        this.edad = edad;
        this.especie = especie;
    }
    hacerSonido() {
        console.log(`${this.nombre} hace un sonido`);
    }
    mostrarEdad() {
        console.log(`${this.nombre} tiene ${this.edad} años`);
    }
    getEspecie() {
        return this.especie;
    }
}
class Perro extends Animal {
    constructor(nombre, edad, raza) {
        super(nombre, edad, "Canis lupus");
        this.raza = raza;
    }
    hacerSonido() {
        console.log(`${this.nombre} ladra: ¡Guau guau!`);
    }
    mostrarInfo() {
        console.log(`Nombre: ${this.nombre}, Raza: ${this.raza}`);
        this.mostrarEdad();
    }
}
let miPerro = new Perro("Bobby", 3, "Golden Retriever");
miPerro.hacerSonido();
miPerro.mostrarInfo();
console.log("Especie:", miPerro.getEspecie());
console.log("\n🔄 8. GENERICS");
console.log("─".repeat(40));
function identidad(arg) {
    return arg;
}
class Contenedor {
    constructor(contenido) {
        this.contenido = contenido;
    }
    obtener() {
        return this.contenido;
    }
    establecer(nuevoContenido) {
        this.contenido = nuevoContenido;
    }
}
let textoIdentico = identidad("Hola mundo");
let numeroIdentico = identidad(42);
let contenedorTexto = new Contenedor("Contenido de texto");
let contenedorNumero = new Contenedor(100);
console.log("Texto idéntico:", textoIdentico);
console.log("Número idéntico:", numeroIdentico);
console.log("Contenedor de texto:", contenedorTexto.obtener());
console.log("Contenedor de número:", contenedorNumero.obtener());
console.log("\n⚠️ 9. MANEJO DE ERRORES");
console.log("─".repeat(40));
function dividir(a, b) {
    if (b === 0) {
        throw new Error("No se puede dividir por cero");
    }
    return a / b;
}
try {
    let resultado1 = dividir(10, 2);
    console.log("División exitosa: 10 / 2 =", resultado1);
    dividir(10, 0);
    console.log("Esta línea no se ejecutará");
}
catch (error) {
    if (error instanceof Error) {
        console.log("Error capturado:", error.message);
    }
}
finally {
    console.log("Bloque finally siempre se ejecuta");
}
console.log("\n🎯 10. TIPOS AVANZADOS");
console.log("─".repeat(40));
let usuarioPublico = {
    id: 1,
    nombre: "Ana",
    email: "ana@email.com",
};
console.log("Usuario público:", usuarioPublico);
console.log("\n🎉 ¡PRUEBAS DE TYPESCRIPT COMPLETADAS!");
console.log("===============================================");
console.log("✅ Variables y tipos básicos");
console.log("✅ Arrays y tuplas");
console.log("✅ Objetos e interfaces");
console.log("✅ Funciones tipadas");
console.log("✅ Enums");
console.log("✅ Union types y type aliases");
console.log("✅ Clases y herencia");
console.log("✅ Generics");
console.log("✅ Manejo de errores");
console.log("✅ Tipos avanzados");
console.log("===============================================");
console.log("🚀 ¡El entorno de TypeScript está funcionando correctamente!");
//# sourceMappingURL=index.js.map