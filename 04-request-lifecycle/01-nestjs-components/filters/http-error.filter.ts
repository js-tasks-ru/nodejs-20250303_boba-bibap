import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import * as fs from "fs";

export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception instanceof HttpException ? exception.message : "Mock error for testing";
    const timestamp = new Date().toISOString();

    const logFilePath = "errors.log";

    if (!fs.existsSync(logFilePath)) {
      fs.writeFileSync(logFilePath, "", { flag: "w" });
    }

    const errorLog = `[${timestamp}] ${status} - ${message}\n`;
    fs.appendFileSync(logFilePath, errorLog);

    response.status(status).json({
      statusCode: status,
      message,
      timestamp,
    });
  }
}
