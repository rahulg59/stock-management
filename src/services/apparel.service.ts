import * as fs from 'fs';
import * as path from 'path';
import { ApparelStock } from '../models/apparel-stock.model';
import { OrderInfoModel } from '../models/order-info.model';

const LOCAL_DATA_PATH = path.join(__dirname, "../data/stock.json");

function readStocks(): ApparelStock[] {
  return JSON.parse(fs.readFileSync(LOCAL_DATA_PATH, "utf8"));
}

function writeStocks(data: ApparelStock[]) {
  fs.writeFileSync(LOCAL_DATA_PATH, JSON.stringify(data, null, 2));
}

export function updateStock(update: ApparelStock): "Add" | "Update" {
    const stocks = readStocks();
    const index = stocks.findIndex(s => s.code === update.code && s.size === update.size);
    if (index > -1) {
        stocks[index] = update;
        return "Update";
    } else {
        stocks.push(update);
        return "Add";
    }
}

export function batchUpdateStock(updates: ApparelStock[]) {
  return updates.map(updateStock);
}

export function canFulfillOrder(order: OrderInfoModel[]): boolean {
  const stock = readStocks();
  return order.every(item => {
    const record = stock.find(s => s.code === item.code && s.size === item.size);
    return record && record.quantity >= item.quantity;
  });
}

export function getLowestCost(order: OrderInfoModel[]): number | null {
  const stock = readStocks();
  if (!canFulfillOrder(order)) {
    // check if order can be fullfilled, if not then return null
    return null
  };

  return order.reduce((sum, item) => {
    const record = stock.find(s => s.code === item.code && s.size === item.size);
    return sum + (record!.price * item.quantity);
  }, 0);
}