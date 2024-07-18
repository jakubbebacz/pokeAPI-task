import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { interfaces } from "inversify";
import getContainer from "../ioc/inversify.config";
import { COMMON_TYPES } from "../ioc/commonTypes";
import { ILogger } from "../commonServices/ILogger";
import {ISuccessResponse} from "../Interfaces/ISuccessResponse";
import { IFunctionService } from "./services/IFunctionService";

const httpTrigger: AzureFunction = async (ctx: Context, req: HttpRequest): Promise<any> => {
    const container: interfaces.Container = getContainer(ctx, "1");
    const logger: ILogger = container.get<ILogger>(COMMON_TYPES.ILogger);
    logger.info(`Http trigger invoked`);

    const functionService: IFunctionService<any> =
        container.get<IFunctionService<any>>(COMMON_TYPES.IFunctionService);
    const response: ISuccessResponse | { error: string } = await functionService.processMessageAsync(req.query);

    let status: number;
    let body: ISuccessResponse | string;

    if ('error' in response) {
        status = 400;
        body = response.error;
    } else {
        status = 200;
        body = response;
    }

    ctx.res = {
        body,
        status,
        headers: { "Content-Type": "application/json" },
    };
    return ctx.res;
};

export default httpTrigger;