import koa from "koa";
import "dotenv/config";
import koa_router from "koa-router";
import routes from "./routes";
import bodyParser from "koa-bodyparser";
import db_connect from "./db/connect";
import logger from "./logger/";
import jwtUtil from "./utils/jwt";

const port = process.env.PORT || 8080;

const app = new koa();

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

const router2 = new koa_router();
router2.get("/deneme", (ctx) => {
  console.log("ok");
  ctx.body = "hecalisiyor";
});

router.get("/", home);

router.get("/bodytest", (ctx) => {
  const body = ctx.request?.body;
  console.log(body);
  ctx.status = 200;
  ctx.body = "ok";
});

//use router *important
// app.use(router.routes());
app.use(routes.home_router.routes());
app.use(router2.routes());

//connect db
db_connect();

//jwtUtil.writeRsaKeys();

//listen
app.listen(port, () => {
  logger.info(`listening port:${port}`);
});
