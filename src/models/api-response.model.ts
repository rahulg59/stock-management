export type ApiResponseModel<T> = {
    error?: string;
    errorCode?: number;
    message: string;
    data?: T;
}