import { Vendor } from '../models/apparel-stock.model';
import { OrderInfoModel } from '../models/order-info.model';
import { readData } from './data.service';

export const canFulfill = (order: OrderInfoModel[]): boolean => {
  const vendors = readData();
  const needed = new Map(order.map(item => [item.code + item.size, item.quantity]));

  for (const vendor of vendors) {
    for (const stock of vendor.stock) {
      const key = stock.code + stock.size;
      if (needed.has(key)) {
        const remaining = needed.get(key)!;
        const fulfilled = Math.min(remaining, stock.quantity);
        needed.set(key, remaining - fulfilled);
      }
    }
  }

  return Array.from(needed.values()).every(qty => qty <= 0);
};

export const getOrderLowestCost = (order: OrderInfoModel[]) => {
  const vendors: Vendor[] = readData();
  const result: any[] = [];
  let totalCost = 0;

  for (const item of order) {
    const { code, size, quantity: qtyNeeded } = item;
    let remaining = qtyNeeded;

    // Find all vendor & stocks that can fulfill this item
    const availableOffers = vendors
      .flatMap(vendor => {
        return vendor.stock
          .filter(stock => {
            return stock.code === code && stock.size === size && stock.quantity > 0
          })
          .map(stock => ({
            vendorId: vendor.vendorId,
            availableQty: stock.quantity,
            unitPrice: stock.price
          }));
      }).sort((a, b) => a.unitPrice - b.unitPrice);

    // check to fulfill this item using the cheapest available stock
    for (const offer of availableOffers) {
      if (remaining === 0) break;

      const usedQty = Math.min(remaining, offer.availableQty);
      result.push({
        vendorId: offer.vendorId,
        code,
        size,
        quantity: usedQty,
        unitPrice: offer.unitPrice,
        subtotal: usedQty * offer.unitPrice
      });

      totalCost = totalCost + (usedQty * offer.unitPrice);
      remaining = remaining - usedQty;
    }

    // Incase order cannot be fulfilled by this item's total quantity
    if (remaining > 0) {
      return {
        totalCost: null,
        breakdown: null,
        message: `Cannot fulfill order for ${code} (size ${size})`
      };
    }
  }

  return {
    totalCost,
    breakdown: result
  };
};