export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      ENV: "test" | "dev" | "prod";
      DB_URI: string;
      JWT_PRIVATE_KEY_PATH: string; // private key path
      JWT_PUBLIC_KEY_PATH: string; // public key path
      JWT_EXPIRE_TIME?: string; // 1h or 30m 1d etc.
    }
  }
}
