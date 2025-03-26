import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class NotificationsService {
    private filePath = path.join(__dirname, '..', 'logs.txt')

    async logToFile (content: string): Promise<void> {
        try {
            await fs.promises.appendFile(this.filePath, `\n${content}`);
            console.log('File written successfully');
        } catch (e) {
            console.error('Error writing to file', e);
        }
    }
    async sendEmail(to: string, subject: string, message: string): Promise<void> {
        const output = `Email sent to ${to}: ${subject} Вы назначены ответственным за задачу: "${message}"`
        await this.logToFile(output);
        console.log(output);
    }
    async sendSMS(to: string, message: string): Promise<void> {
        const output = `SMS sent to ${to}: ${message}`
        await this.logToFile(output);
        console.log(output);
    }
}

