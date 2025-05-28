import { Request, Response } from "express";
import * as apparelService from "../services/vender.service";
import { ApiResponseModel } from "../models/api-response.model";

export function updateSingle(req: Request, res: Response) {
    const vendorId = req.params.vendorId;
    const status = apparelService.updateStock(vendorId, req.body);
    if (status == "Update") {
        const response: ApiResponseModel<string> = {
            message: "Vendor Stocks has been updated",
            data: status
        }
        res.json(response);
    } else {
        const response: ApiResponseModel<string> = {
            message: "A New Vendor has been added",
            data: status
        }
        res.json(response);
    }
}

export function batchUpdate(req: Request, res: Response) {
    const vendorId = req.params.vendorId;
    const status = apparelService.batchUpdateStock(vendorId, req.body);
    const addedVendors = status.filter(s => s == "Add").length;
    const updatedStocks = status.filter(s => s == "Update").length;
    const response: ApiResponseModel<any> = {
        message: `${addedVendors} Vendors have been added and ${updatedStocks} Stocks have been updated`,
        data: {
            addCount: addedVendors,
            updateCount: updatedStocks
        }
    }
    res.json(response);
}