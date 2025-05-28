import { readData, writeData } from './data.service';
import { ApparelStock } from '../models/apparel-stock.model';
import { OrderInfoModel } from '../models/order-info.model';



export function updateStock(vendorId: string, stockItem: ApparelStock): "Add" | "Update" {
  const vendors = readData();
  const vendor = vendors.find(v => v.vendorId === vendorId);
  if (!vendor) {
    vendors.push({ vendorId, stock: [stockItem] });
    writeData(vendors);
    return "Add";
  } else {
    const existingStock = vendor.stock.find(
      s => s.code === stockItem.code && s.size === stockItem.size
    );
    if (existingStock) {
      existingStock.quantity = stockItem.quantity;
      existingStock.price = stockItem.price;
    } else {
      vendor.stock.push(stockItem);
    }
    writeData(vendors);
    return "Update";
  }
}

export function batchUpdateStock(vendorId: string, stockItems: ApparelStock[]) {
  return stockItems.map(stockItem => updateStock(vendorId, stockItem));
}