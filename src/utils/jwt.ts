import * as jose from "jose";
import fs from "fs";
import path from "path";
import "dotenv/config";
import logger from "../logger";
import IJwt from "../types/jwtClaim";

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

const alg = "RS256"; // algorithm, see others in jwt.io

async function generateRsaKeys() {
  /*define options (optional)
    crv?: string;
    modulusLength?: number;
    extractable?: boolean;
  */
  const options = {
    modulusLength: 4096, //set length to 4096, min len is 2048
  };

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
      `private and public keys written to ${publicKeyPath} ${privateKeyPath} paths`
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

async function readKeys() {
  try {
    const privateKeyText = fs.readFileSync(privateKeyPath).toString(); //read raw text
    const publicKeyText = fs.readFileSync(publicKeyPath).toString(); //read raw text

    const privateKey = await jose.importPKCS8(privateKeyText, alg); //import private key from taw text
    const publicKey = await jose.importSPKI(publicKeyText, alg); //import public key from raw text

    return { privateKey: privateKey, publicKey: publicKey };
  } catch (err) {
    logger.error(
      "some error occured while reading rsa keys in readKeys function",
      err
    );
  }
}

async function signJwtKey(claims: IJwt) {
  const { privateKey, publicKey } = await readKeys();
  const expireTime = process.env.JWT_EXPIRE_TIME || "30m";

  let claimsString = JSON.parse(JSON.stringify(claims)); //turning claims object into string without quotes

  const jwt = await new jose.SignJWT({ sub: claimsString })
    .setProtectedHeader({ alg }) //set algorithm
    .setIssuedAt(Date.now()) // issued at right now
    .setIssuer("system:authentication_service") // issuer is currently system
    .setAudience("system:customers") // idk what is that
    .setExpirationTime("2h")
    .sign(privateKey);

  return jwt;
}

async function verifyJwt(token: string): Promise<jose.JWTVerifyResult> {
  const { privateKey, publicKey } = await readKeys();
  const result = await jose.jwtVerify(token, publicKey).catch((err) => {
    throw err;
  });
  return result;
}

export default { checkRsaKeys, signJwtKey, verifyJwt };
