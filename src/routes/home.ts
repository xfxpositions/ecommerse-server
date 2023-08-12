//home
import koa_router from "koa-router";
import auth_middleware from "../middlewares/auth";
import logger_middleware from "../middlewares/logger";

const router = new koa_router();
router.use(logger_middleware);

function home(ctx) {
  const method = ctx.method;
  ctx.body = "<h1>Hello</h1>";
}

router.get("/", auth_middleware, home);

export default router;
