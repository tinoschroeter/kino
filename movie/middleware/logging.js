import type { Request, Response, Next } from './types';
import morgan from "morgan";
import fs from 'fs';
import path from 'path';

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a' })
const logger = morgan('combined', { stream: accessLogStream })

export default async (req: Request, res: Response, next: Next) => {
  logger(req, res, function (err) {
    return next();
  })
};
