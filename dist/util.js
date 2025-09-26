import { AppxSdk } from "./index.js";
const app = new AppxSdk("http://localhost:3001");
const data = await app.login("g@gmail.com", "pass");
console.log(data);
//# sourceMappingURL=util.js.map