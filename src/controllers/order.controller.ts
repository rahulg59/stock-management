import { Request, Response } from "express";
import * as orderService from "../services/order.service";
import { ApiResponseModel } from "../models/api-response.model";

export function checkFulfillment(req: Request, res: Response) {
    const result = orderService.canFulfill(req.body);
    const response: ApiResponseModel<any> = {
        message: result ? 'Order can be fullfilled' : 'Order cannot be fullfilled',
        data: { 
            canFulfill: result 
        }
    }
    res.json(response);
}

export function getLowestCost(req: Request, res: Response) {
    const result = orderService.getOrderLowestCost(req.body);
    if (result.totalCost === null) {
        const errorResponse: ApiResponseModel<any> = {
            message: result.message,
            errorCode: 400,
            error: 'ERR: Invalid Order'
        }
        res.status(400).json(errorResponse);
    } else {
        const response: ApiResponseModel<any> = {
            message: `Lowest Cost for the order ${result.totalCost}`,
            data: {
                lowestCost: result.totalCost,
                breakdown: result.breakdown
            }
        }
        res.json(response);
    }
}