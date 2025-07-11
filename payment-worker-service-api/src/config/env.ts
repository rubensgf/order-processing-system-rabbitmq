
import dotenv from 'dotenv';
dotenv.config();

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Variável wwwwde ambiente ${name} não definida`);
  return value;
}

//export const RABBITMQ_URL = getEnv('RABBITMQ_URL');
export const RABBITMQ_URL='amqp://user:pass@rabbitmq:5672'