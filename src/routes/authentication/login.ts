import koaRouter from "koa-router";
import jwt from "../../utils/jwt";
import IJwt from "../../types/jwtClaim";

const router = new koaRouter();

interface LoginRequestBody {
  username: string;
  password: string;
}

router.post("/login", async (ctx) => {
  const { username, password } = ctx.request.body as LoginRequestBody;

  if (!username || !password) {
    ctx.status = 400;
    ctx.body = { error: "Username and password are required." };
    return;
  }

  //fake db call
  const id = "x04vb22p";

  const claims: IJwt = {
    id: id,
    username: username,
  };

  //validate username and password etc stuff !todo
  if (username === "josef" && password === "12345") {
    const token = await jwt.signJwtKey(claims);

    // Return the token with 200 status code
    ctx.status = 200; // Success
    ctx.body = { token: token };
  } else {
    // Return an error response if authentication fails
    ctx.status = 401; // Unauthorized
    ctx.body = { error: "Invalid username or password." };
  }
});

export default router;
