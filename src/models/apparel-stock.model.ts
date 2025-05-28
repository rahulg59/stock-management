export type ApparelStock = {
  code: string;
  size: string;
  quantity: number;
  price: number;
}

export type Vendor = {
  vendorId: string;
  stock: ApparelStock[];
}