import { Request, Response } from "express";
import * as apparelService from "../services/apparel.service";
import { ApiResponseModel } from "../models/api-response.model";

export function updateSingle(req: Request, res: Response) {
    const status = apparelService.updateStock(req.body);
    if (status == "Update") {
        const response: ApiResponseModel<string> = {
            message: "Stock has been updated",
            data: status
        }
        res.json(response);
    } else {
        const response: ApiResponseModel<string> = {
            message: "A New Stock has been added",
            data: status
        }
        res.json(response);
    }
}

export function batchUpdate(req: Request, res: Response) {
    const status = apparelService.batchUpdateStock(req.body);
    const addedStocks = status.filter(s => s == "Add").length;
    const updatedStocks = status.filter(s => s == "Update").length;
    const response: ApiResponseModel<any> = {
        message: `${addedStocks} Stocks have been added and ${updatedStocks} Stocks have been updated`,
        data: {
            addCount: addedStocks,
            updateCount: updatedStocks
        }
    }
    res.json(response);
}

export function checkFulfillment(req: Request, res: Response) {
    const result = apparelService.canFulfillOrder(req.body);
    const response: ApiResponseModel<any> = {
        message: result ? 'Order can be fullfilled' : 'Order cannot be fullfilled',
        data: { 
            canFulfill: result 
        }
    }
    res.json(response);
}

export function getCost(req: Request, res: Response) {
    const cost = apparelService.getLowestCost(req.body);
    if (cost === null) {
        const errorResponse: ApiResponseModel<any> = {
            message: 'Order cannot be fullfilled',
            errorCode: 400,
            error: 'ERR: Invalid Order'
        }
        res.status(400).json(errorResponse);
    } else {
        const response: ApiResponseModel<any> = {
            message: `Lowest Cost for the order ${cost}`,
            data: {
                lowestCost: cost
            }
        }
        res.json(response);
    }
}