import { Daemon } from "./agent";
import storeHandlers from "./store";
import walletHandlers from "./wallet";

const s = new Daemon();
s.registerHandlers(storeHandlers);
s.registerHandlers(walletHandlers);

export default s;
