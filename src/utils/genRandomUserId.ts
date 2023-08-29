import { Random } from "random-js";
import User from "../models/user";
import logger from "../logger";

const random = new Random(); // uses the nativeMath engine

function genRandomUserId(): Number {
  while (true) {
    const value = random.integer(1, 100);

    User.findOne({ userId: value }, (err, user) => {
      // user is a single document which may be null for no results
      if (err) {
        logger.error(
          `Some error happened while generating a new UserId ${err.message}`
        );
        return;
      }
      if (!user) {
        return value;
        // there is no user
      }
    });
  }
}

export default genRandomUserId;
