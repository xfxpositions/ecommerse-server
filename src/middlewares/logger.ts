import logger from "../logger";

export default function (ctx, next) {
  const method = ctx.method;
  const client_ip =
    ctx.req.ip ||
    ctx.req.headers["x-forwarded-for"] ||
    ctx.req.connection.remoteAddress;
  logger.info(`method: ${method} ip: ${client_ip}`);

  next();
}
