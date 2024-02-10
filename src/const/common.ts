export const SERVER_PORT: number = parseInt(process.env.SERVER_PORT as string, 10);
export const SERVER_HOST: string = process.env.SERVER_HOST ?? 'localhost';
