// Génère une paire de clés VAPID P-256 au format attendu par @block65/webcrypto-web-push :
//  - publicKey  : clé publique non compressée (65 octets) en base64url
//  - privateKey : paramètre "d" de la clé privée, en base64url
import { generateKeyPairSync } from "node:crypto";

const { publicKey, privateKey } = generateKeyPairSync("ec", { namedCurve: "prime256v1" });
const pub = publicKey.export({ format: "jwk" });
const priv = privateKey.export({ format: "jwk" });

const x = Buffer.from(pub.x, "base64url");
const y = Buffer.from(pub.y, "base64url");
const uncompressed = Buffer.concat([Buffer.from([0x04]), x, y]); // 1 + 32 + 32 = 65 octets

console.log("Clés VAPID générées (ne commite JAMAIS la clé privée) :\n");
console.log(`VAPID_PUBLIC_KEY=${uncompressed.toString("base64url")}`);
console.log(`VAPID_PRIVATE_KEY=${priv.d}`);
console.log("VAPID_SUBJECT=mailto:ton-email@exemple.com");
console.log("\nLocal : copie ces lignes dans .dev.vars");
console.log("Prod  : npx wrangler secret put VAPID_PUBLIC_KEY (puis VAPID_PRIVATE_KEY et VAPID_SUBJECT)");
