"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const envs_1 = require("./config/envs");
const index_1 = __importDefault(require("./routes/index"));
const data_source_1 = require("./data-source");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/test", (_, res) => {
    res.json({
        message: "Express server is working",
        timestamp: new Date().toISOString(),
        pid: process.pid,
    });
});
app.use("/", index_1.default);
const PORT = envs_1.config.PORT;
async function initializeApp() {
    try {
        console.log("🔄 Conectando a la base de datos...");
        await data_source_1.AppDataSource.initialize();
        console.log("✅ Conexión a la base de datos establecida");
        app.listen(PORT, () => {
            console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
            console.log(`📊 Base de datos: ${envs_1.config.DB_DATABASE} en ${envs_1.config.DB_HOST}:${envs_1.config.DB_PORT}`);
            console.log(`🌍 Entorno: ${envs_1.config.NODE_ENV}`);
        });
    }
    catch (error) {
        console.error("❌ Error al inicializar la aplicación:", error);
        process.exit(1);
    }
}
initializeApp();
//# sourceMappingURL=index.js.map