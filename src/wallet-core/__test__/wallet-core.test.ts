import test from "ava";
import { WalletCore } from "../wallet-core";

class MockEncryptor {
  password?: string;

  encrypt(password: string, data: string) {
    const payload = { password, data: JSON.stringify(data) };
    return Buffer.from(JSON.stringify(payload)).toString("base64");
  }

  decrypt(password: string, data: string) {
    const s = Buffer.from(data, "base64").toString("ascii");
    const payload = JSON.parse(s);
    if (payload.password !== password) {
      throw new Error("Incorrent Password");
    }
    return JSON.parse(payload.data);
  }
}

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

test("recover keyring controller", async (t) => {
  const password = "password";
  const old = new WalletCore();
  await old.createKeyringController(password, {
    encryptor: new MockEncryptor(),
  });

  t.notThrows(async () => {
    await old.verifyPassword(password);
  });

  const { vault } = old.keyringController.store.getState();
  const privateKey = old.getAccount()?.privateKey;

  const lastest = new WalletCore();
  lastest.recoverKeyringController(vault, { encryptor: new MockEncryptor() });

  t.notThrows(async () => {
    await lastest.verifyPassword(password);
  });

  await lastest.unlock(password);
  const acc = lastest.getAccount();
  t.deepEqual(
    acc?.privateKey,
    privateKey,
    "old wallet privateKey should equal to new  wallet privateKey"
  );
});
