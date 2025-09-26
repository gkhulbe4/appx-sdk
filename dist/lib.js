import { AppxSdk } from "./index.js";
const app = new AppxSdk("http://localhost:3000");
const data = await app.login("g@gmail.com", "otp");
console.log(data);
//# sourceMappingURL=lib.js.map