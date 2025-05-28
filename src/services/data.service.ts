import * as fs from 'fs';
import * as path from 'path';
import { Vendor } from '../models/apparel-stock.model';
import "../data/stock.json"

const LOCAL_DATA_PATH = path.join(__dirname, "../data/stock.json");

export const readData = (): Vendor[] => {
  return JSON.parse(fs.readFileSync(LOCAL_DATA_PATH, "utf8"));
}

export const writeData = (data: Vendor[]) => {
  fs.writeFileSync(LOCAL_DATA_PATH, JSON.stringify(data, null, 2));
}