import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: Configure CORS so the React frontend (localhost:5173) can reach this API.
  app.enableCors();

  // Enables DTO validation globally via class-validator decorators.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
  console.log("Backend running on http://localhost:3000");
}

bootstrap();
