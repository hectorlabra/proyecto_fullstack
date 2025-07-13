// ===============================================
// MÓDULO INDEX.TS - SANDBOX DE TYPESCRIPT
// ===============================================
// Este archivo sirve como sandbox para probar
// las características de TypeScript vistas en clase
// ===============================================

console.log("🚀 ¡Bienvenido al sandbox de TypeScript!");
console.log("===============================================");

// ===============================================
// 1. TIPOS BÁSICOS Y VARIABLES
// ===============================================
console.log("\n📋 1. TIPOS BÁSICOS Y VARIABLES");
console.log("─".repeat(40));

// Tipos primitivos
let nombre: string = "Héctor";
let edad: number = 25;
let esDesarrollador: boolean = true;
let salario: number = 50000.5;

// Tipo any (evitar usar en lo posible)
let cualquierCosa: any = "Puede ser cualquier cosa";
cualquierCosa = 42;
cualquierCosa = true;

// Tipo unknown (más seguro que any)
let valorDesconocido: unknown = "No sabemos qué es esto";

// Tipo null y undefined
let valorNulo: null = null;
let valorIndefinido: undefined = undefined;

console.log(`Nombre: ${nombre} (tipo: ${typeof nombre})`);
console.log(`Edad: ${edad} (tipo: ${typeof edad})`);
console.log(
  `Es desarrollador: ${esDesarrollador} (tipo: ${typeof esDesarrollador})`
);
console.log(`Salario: $${salario} (tipo: ${typeof salario})`);

// ===============================================
// 2. ARRAYS Y TUPLAS
// ===============================================
console.log("\n🗂️ 2. ARRAYS Y TUPLAS");
console.log("─".repeat(40));

// Arrays tipados
let numeros: number[] = [1, 2, 3, 4, 5];
let frutas: string[] = ["manzana", "banana", "naranja"];
let mezcla: (string | number)[] = ["texto", 42, "otro texto", 100];

// Sintaxis alternativa de arrays
let colores: Array<string> = ["rojo", "verde", "azul"];

// Tuplas (arrays con tipos fijos en posiciones específicas)
let persona: [string, number, boolean] = ["Juan", 30, true];
let coordenadas: [number, number] = [10, 20];

console.log("Números:", numeros);
console.log("Frutas:", frutas);
console.log("Mezcla:", mezcla);
console.log("Persona (tupla):", persona);
console.log("Coordenadas:", coordenadas);

// ===============================================
// 3. OBJETOS E INTERFACES
// ===============================================
console.log("\n🏗️ 3. OBJETOS E INTERFACES");
console.log("─".repeat(40));

// Objeto con tipo explícito
let producto: {
  id: number;
  nombre: string;
  precio: number;
  enStock: boolean;
} = {
  id: 1,
  nombre: "Laptop",
  precio: 999.99,
  enStock: true,
};

// Interface (manera más elegante)
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  activo?: boolean; // Propiedad opcional
  readonly fechaCreacion: Date; // Propiedad de solo lectura
}

let usuario: Usuario = {
  id: 1,
  nombre: "María García",
  email: "maria@email.com",
  activo: true,
  fechaCreacion: new Date(),
};

console.log("Producto:", producto);
console.log("Usuario:", usuario);

// ===============================================
// 4. FUNCIONES
// ===============================================
console.log("\n⚙️ 4. FUNCIONES");
console.log("─".repeat(40));

// Función tradicional con tipos
function sumar(a: number, b: number): number {
  return a + b;
}

// Función flecha con tipos
const multiplicar = (a: number, b: number): number => a * b;

// Función con parámetro opcional
function saludar(nombre: string, apellido?: string): string {
  return apellido ? `Hola ${nombre} ${apellido}` : `Hola ${nombre}`;
}

// Función con parámetro por defecto
function crearUsuario(nombre: string, activo: boolean = true): Usuario {
  return {
    id: Math.random(),
    nombre,
    email: `${nombre.toLowerCase()}@email.com`,
    activo,
    fechaCreacion: new Date(),
  };
}

// Función que no retorna nada (void)
function mostrarMensaje(mensaje: string): void {
  console.log(`📢 ${mensaje}`);
}

// Probando las funciones
console.log("Suma 5 + 3 =", sumar(5, 3));
console.log("Multiplicación 4 * 6 =", multiplicar(4, 6));
console.log(saludar("Juan"));
console.log(saludar("Ana", "López"));

let nuevoUsuario = crearUsuario("Pedro");
console.log("Nuevo usuario:", nuevoUsuario);

mostrarMensaje("¡Las funciones funcionan correctamente!");

// ===============================================
// 5. ENUMS
// ===============================================
console.log("\n🏷️ 5. ENUMS");
console.log("─".repeat(40));

// Enum numérico
enum EstadoPedido {
  Pendiente,
  Procesando,
  Enviado,
  Entregado,
  Cancelado,
}

// Enum de strings
enum TipoUsuario {
  ADMIN = "admin",
  MODERADOR = "moderador",
  USUARIO = "usuario",
  INVITADO = "invitado",
}

// Enum con valores mixtos
enum HttpStatus {
  OK = 200,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

let estadoActual: EstadoPedido = EstadoPedido.Procesando;
let tipoUsuarioActual: TipoUsuario = TipoUsuario.ADMIN;

console.log("Estado del pedido:", EstadoPedido[estadoActual]);
console.log("Tipo de usuario:", tipoUsuarioActual);
console.log("Estado HTTP OK:", HttpStatus.OK);

// ===============================================
// 6. UNION TYPES Y TYPE ALIASES
// ===============================================
console.log("\n🔗 6. UNION TYPES Y TYPE ALIASES");
console.log("─".repeat(40));

// Union types (puede ser uno de varios tipos)
type EstadoConexion = "conectado" | "desconectado" | "conectando";
type ID = string | number;

let estado: EstadoConexion = "conectado";
let idUsuario: ID = "user_123";
let idProducto: ID = 456;

// Type alias para objetos complejos
type Direccion = {
  calle: string;
  numero: number;
  ciudad: string;
  codigoPostal: string;
};

type UsuarioCompleto = {
  id: ID;
  nombre: string;
  email: string;
  direccion: Direccion;
  tipo: TipoUsuario;
};

let usuarioCompleto: UsuarioCompleto = {
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

// ===============================================
// 7. CLASES
// ===============================================
console.log("\n🏫 7. CLASES");
console.log("─".repeat(40));

// Clase básica
class Animal {
  public nombre: string;
  protected edad: number;
  private especie: string;

  constructor(nombre: string, edad: number, especie: string) {
    this.nombre = nombre;
    this.edad = edad;
    this.especie = especie;
  }

  public hacerSonido(): void {
    console.log(`${this.nombre} hace un sonido`);
  }

  protected mostrarEdad(): void {
    console.log(`${this.nombre} tiene ${this.edad} años`);
  }

  public getEspecie(): string {
    return this.especie;
  }
}

// Herencia
class Perro extends Animal {
  private raza: string;

  constructor(nombre: string, edad: number, raza: string) {
    super(nombre, edad, "Canis lupus");
    this.raza = raza;
  }

  public hacerSonido(): void {
    console.log(`${this.nombre} ladra: ¡Guau guau!`);
  }

  public mostrarInfo(): void {
    console.log(`Nombre: ${this.nombre}, Raza: ${this.raza}`);
    this.mostrarEdad(); // Método protected accesible desde clase hija
  }
}

// Instanciando clases
let miPerro = new Perro("Bobby", 3, "Golden Retriever");
miPerro.hacerSonido();
miPerro.mostrarInfo();
console.log("Especie:", miPerro.getEspecie());

// ===============================================
// 8. GENERICS
// ===============================================
console.log("\n🔄 8. GENERICS");
console.log("─".repeat(40));

// Función genérica
function identidad<T>(arg: T): T {
  return arg;
}

// Clase genérica
class Contenedor<T> {
  private contenido: T;

  constructor(contenido: T) {
    this.contenido = contenido;
  }

  public obtener(): T {
    return this.contenido;
  }

  public establecer(nuevoContenido: T): void {
    this.contenido = nuevoContenido;
  }
}

// Usando generics
let textoIdentico = identidad<string>("Hola mundo");
let numeroIdentico = identidad<number>(42);

let contenedorTexto = new Contenedor<string>("Contenido de texto");
let contenedorNumero = new Contenedor<number>(100);

console.log("Texto idéntico:", textoIdentico);
console.log("Número idéntico:", numeroIdentico);
console.log("Contenedor de texto:", contenedorTexto.obtener());
console.log("Contenedor de número:", contenedorNumero.obtener());

// ===============================================
// 9. MANEJO DE ERRORES
// ===============================================
console.log("\n⚠️ 9. MANEJO DE ERRORES");
console.log("─".repeat(40));

function dividir(a: number, b: number): number {
  if (b === 0) {
    throw new Error("No se puede dividir por cero");
  }
  return a / b;
}

try {
  let resultado1 = dividir(10, 2);
  console.log("División exitosa: 10 / 2 =", resultado1);

  dividir(10, 0); // Esto generará un error
  console.log("Esta línea no se ejecutará");
} catch (error) {
  if (error instanceof Error) {
    console.log("Error capturado:", error.message);
  }
} finally {
  console.log("Bloque finally siempre se ejecuta");
}

// ===============================================
// 10. TIPOS AVANZADOS
// ===============================================
console.log("\n🎯 10. TIPOS AVANZADOS");
console.log("─".repeat(40));

// Mapped Types
type UsuarioOpcional = {
  [K in keyof Usuario]?: Usuario[K];
};

// Conditional Types
type EsArray<T> = T extends any[] ? true : false;

type TestArray = EsArray<string[]>; // true
type TestString = EsArray<string>; // false

// Utility Types
interface UsuarioBase {
  id: number;
  nombre: string;
  email: string;
  password: string;
}

// Pick - seleccionar propiedades específicas
type UsuarioPublico = Pick<UsuarioBase, "id" | "nombre" | "email">;

// Omit - omitir propiedades específicas
type UsuarioSinPassword = Omit<UsuarioBase, "password">;

// Partial - hacer todas las propiedades opcionales
type UsuarioActualizable = Partial<UsuarioBase>;

let usuarioPublico: UsuarioPublico = {
  id: 1,
  nombre: "Ana",
  email: "ana@email.com",
};

console.log("Usuario público:", usuarioPublico);

// ===============================================
// MENSAJE FINAL
// ===============================================
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
