import test from "ava";
import { WalletCore } from "../wallet-core";

test("create and move account", async (t) => {
  const w = new WalletCore();
  t.deepEqual(w.accounts.length, 0);
  const addr1 = w.createAccount("test1");
  const addr2 = w.createAccount("test2");
  const addr3 = w.createAccount("test3");
  t.deepEqual(
    w.accounts.map((acc) => acc.getAddress()),
    [addr1, addr2, addr3]
  );
  w.removeAccount(addr2);
  t.deepEqual(
    w.accounts.map((acc) => acc.getAddress()),
    [addr1, addr3]
  );
});
