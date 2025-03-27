import {CanActivate, ExecutionContext, ForbiddenException} from "@nestjs/common";

export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest()
    if (req.headers['x-role'] !== 'admin') {
     throw new ForbiddenException("Доступ запрещён: требуется роль admin")
    }
    return true
  }
}
