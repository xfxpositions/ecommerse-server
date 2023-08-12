import * as jose from "jose";
import fs from "fs";
import path from "path";
import "dotenv/config";

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

async function writeRsaKeys() {
  const privateKeyPath: string = path.join(
    __dirname,
    "..",
    "..",
    process.env.JWT_PRIVATE_KEY_PATH
  );
  // root/private.key
  console.log(privateKeyPath);
}

writeRsaKeys();

// generate_rsa_keys().then(({ publicKey, privateKey }) => {
//   console.log(privateKey);
//   console.log(publicKey);
// });

async function generateRSAKeys() {
  // // Anahtarları dosyalara yaz
  // fs.writeFileSync("private_key.pem", privateKey.toPEM(true));
  // fs.writeFileSync("public_key.pem", publicKey.toPEM());
  // console.log("RSA anahtar çiftleri oluşturuldu ve dosyalara yazıldı.");
}

//generateRSAKeys().catch((error) => console.error("Hata:", error));
export default { writeRsaKeys };
