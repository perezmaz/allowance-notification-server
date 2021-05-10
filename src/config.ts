// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const { env } = process;

export const api = {
  PORT: env.PORT,
  VERSION: env.VERSION,
};

export const db = {
  HOST: env.DB_HOST,
  PORT: env.DB_PORT,
  DATABASE: env.DATABASE,
};

export const jwtToken = {
  SECRET_KEY: env.SECRET_KEY,
};

export const webSocket = {
  PORT: parseInt(env.SOCKET_PORT),
};
