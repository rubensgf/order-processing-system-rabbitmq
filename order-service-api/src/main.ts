import { json } from "body-parser";
import express from "express";
import dotenv from 'dotenv';

import { getChannel } from './infra/rabbitmq';
import { startOrderGeneration } from "./jobs/OrderGeneratorJob";
import logger from './infra/logger'; 

dotenv.config();

const app = express();
app.use(json());

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    await getChannel();

    app.listen(PORT, () => {
      logger.info({ port: PORT }, 'Order Service rodando com sucesso');
      startOrderGeneration();
    });
  } catch (error) {
    logger.error({ err: error }, 'Erro na inicialização do Order Service');
    process.exit(1);
  }
}

bootstrap();
