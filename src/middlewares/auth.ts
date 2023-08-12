import jwt from "../utils/jwt";

async function auth(ctx, next) {
  const authorization: string = ctx.headers.authorization;
  const token: string = authorization.substring(7); // get token from Bearer ${token}
  console.debug(`token: ${token}`);
  try {
    await jwt.verifyJwt(token); //try to verify
    await next();
  } catch (err) {
    console.debug(`error while verifying err:${err.code}`);

    ctx.status = 401;
    ctx.body = { status: "unauthorized", message: err.message };

    return;
    //if err, return 401 und error
  }
}

export default auth;
