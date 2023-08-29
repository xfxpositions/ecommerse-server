import koa from "koa";
import "dotenv/config";
import koa_router from "koa-router";
import routes from "./routes";
import bodyParser from "koa-bodyparser";
import db_connect from "./db/connect";
import logger from "./logger/";
import jwtUtil from "./utils/jwt";
import middlewares from "./middlewares";

const port = process.env.PORT || 8080;

const app = new koa();

//use bodyparser
app.use(bodyParser());

//declare router
const router = new koa_router();

//home
function home(ctx, next) {
  const method = ctx.method;
  ctx.body = "<h1>Hello</h1>";
  console.log(method);
  next();
}

//middlewares
app.use(middlewares.logger);
//app.use(middlewares.auth);

router.get("/", home);

//use router *important
app.use(routes.home_router.routes());
app.use(routes.auth_login.routes());

//connect db
db_connect();

//check if rsa keys created
jwtUtil.checkRsaKeys();

//listen
app.listen(port, () => {
  logger.info(`listening port:${port}`);
});
