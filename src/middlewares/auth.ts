function auth(ctx, next) {
  let authorization = ctx.headers.authorization;
  console.log("authorization:" + authorization);
  next();
}

export default auth;
