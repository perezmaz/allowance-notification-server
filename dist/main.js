"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet = require("helmet");
const cors = require("cors");
const common_1 = require("@nestjs/common");
const config_1 = require("./config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(helmet());
    app.use(cors({
        origin: '*',
        optionsSuccessStatus: 200,
    }));
    await app.listen(config_1.api.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map