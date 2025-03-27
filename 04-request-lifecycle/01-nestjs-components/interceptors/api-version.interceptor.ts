import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import {map} from "rxjs";

export class ApiVersionInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler) {
    const startTime = Date.now();

    return next.handle().pipe(
        map((data) => {
          const executionTime = `${Date.now() - startTime}ms`;
          return {
            ...data,
            apiVersion: "1.0",
            executionTime,
          };
        })
    );
  }
}
