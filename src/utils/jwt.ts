import * as jose from "jose";
import fs from "fs";
import path from "path";
import "dotenv/config";
import logger from "../logger";

const privateKeyPath: string = path.join(
  __dirname,
  "..",
  "..",
  process.env.JWT_PRIVATE_KEY_PATH
);

const publicKeyPath: string = path.join(
  __dirname,
  "..",
  "..",
  process.env.JWT_PUBLIC_KEY_PATH
);
/* 
| -> package.json
| -> src/ 
| -> private.key
| -> public.key
*/

async function generateRsaKeys() {
  /*define options (optional)
    crv?: string;
    modulusLength?: number;
    extractable?: boolean;
  */
  const options = {
    modulusLength: 4096, //set length to 4096, min len is 2048
  };

  const alg = "RS256"; // algorithm, see others in jwt.io
  const { publicKey, privateKey } = await jose.generateKeyPair(alg, options); //declare public and private key

  const pkcs8PemPrivate = await jose.exportPKCS8(privateKey); //toString for privateKey

  const spkiPemPublic = await jose.exportSPKI(publicKey); //toString for publicKey

  return { privateKey: pkcs8PemPrivate, publicKey: spkiPemPublic };
}

function writeRsaKeys(privateKey: string, publicKey: string) {
  try {
    fs.writeFileSync(privateKeyPath, privateKey);
    fs.writeFileSync(publicKeyPath, publicKey);
    // file written successfully
    logger.info(
      `private and public keys written to ${publicKeyPath} and ${privateKeyPath} paths`
    );
  } catch (err) {
    logger.error(
      "some error occured while writing rsa keys in writeRsaKeys function",
      err
    );
    process.exit(1); //idk should we exit in that error.
  }
}

async function checkRsaKeys() {
  if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
    //if privateKey or publicKey is not defined
    const { privateKey, publicKey } = await generateRsaKeys(); //generating new private and public keys
    writeRsaKeys(privateKey, publicKey); // writing keys
  }
}

export default { checkRsaKeys };
