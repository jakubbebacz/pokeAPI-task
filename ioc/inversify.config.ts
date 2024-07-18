import "reflect-metadata";
import {Container, interfaces} from "inversify";
import {Context} from "@azure/functions";
import {Logger} from "../commonServices/Logger";
import {ILogger} from "../commonServices/ILogger";
import {IFunctionService} from "../HttpTrigger/services/IFunctionService";
import {FunctionService} from "../HttpTrigger/services/FunctionService";
import {COMMON_TYPES} from "./commonTypes";
const getContainer: (ctx: Context, processId: string) => interfaces.Container =
    (ctx: Context, processId: string): interfaces.Container => {
        const container: interfaces.Container = new Container();

        container
            .bind<ILogger>(COMMON_TYPES.ILogger)
            .toDynamicValue((): ILogger => {
                const logger: Logger = new Logger();
                logger.init(ctx, processId);
                return logger;
            })
            .inSingletonScope();

        container
            .bind<IFunctionService<any>>(COMMON_TYPES.IFunctionService)
            .to(FunctionService);

        return container;
    };

export default getContainer;
