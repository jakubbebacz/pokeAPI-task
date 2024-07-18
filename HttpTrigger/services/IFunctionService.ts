import {ISuccessResponse} from "../../Interfaces/ISuccessResponse";

export interface IFunctionService<T> {
    processMessageAsync(message: T): Promise<ISuccessResponse | {error: string}>
}
