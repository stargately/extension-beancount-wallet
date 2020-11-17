import { printLine } from "./modules/print";
import { postMessage } from "./modules/message";

(window as any).antenna = { printLine, postMessage };
