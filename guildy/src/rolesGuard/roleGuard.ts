import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private db: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles?.length) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    const discordId = req.discordId;
    const guildId = req.body.discordGuildId;

    const member = await this.db.guildMember.findFirst({
      where: {
        user: {
          discordId,
        },
        guild: {
          discordGuildId: guildId,
        },
      },
    });

    if (!member) {
      throw new ForbiddenException();
    }

    return roles.includes(member.rank);
  }
}