import test from "ava";

const KeyringController = require("eth-keyring-controller");
require("browser-env")();
const { Crypto } = require("@peculiar/webcrypto");

// @ts-ignore
if (!global.crypto) {
  // @ts-ignore
  global.crypto = new Crypto();
}

test("lock keys", async (t) => {
  const keyringController = new KeyringController({});
  await keyringController.createNewVaultAndKeychain("password");
  const privateKey =
    "98ba3472fce96b0135e7ad7923a0c6f9ee8ec98a039529752a3a6e4d43bc802a";
  const keyring = await keyringController.addNewKeyring("Simple Key Pair", [
    privateKey,
  ]);
  t.deepEqual(keyring.wallets[0]._privKey.toString("hex"), privateKey);
  // verify key added and converted
  t.notDeepEqual(keyringController.keyrings[0], keyring);
  t.truthy(keyringController.memStore.getState().isUnlocked);

  // lock keys
  t.deepEqual(keyringController.keyrings.length, 2);
  await keyringController.setLocked();
  // is locked
  t.falsy(keyringController.memStore.getState().isUnlocked);
  t.deepEqual(keyringController.keyrings.length, 0);

  // unlock keys
  await keyringController.submitPassword("password");
  t.deepEqual(keyringController.keyrings.length, 2);
  // is unlocked
  t.truthy(keyringController.memStore.getState().isUnlocked);

  // get private key from key rings
  t.deepEqual(
    keyringController.keyrings[1].wallets[0].getPrivateKey().toString("hex"),
    privateKey
  );
});

test("init with initState", async (t) => {
  const keyringController = new KeyringController({});
  await keyringController.createNewVaultAndKeychain("password");
  const privateKey =
    "98ba3472fce96b0135e7ad7923a0c6f9ee8ec98a039529752a3a6e4d43bc802a";
  await keyringController.addNewKeyring("Simple Key Pair", [privateKey]);
  const preState = keyringController.store.getState();
  // a new keyring init with preState
  const anotherKeyringController = new KeyringController({
    initState: preState,
  });
  // decrypt to load mem status
  await anotherKeyringController.submitPassword("password");
  // should be the same
  t.deepEqual(
    anotherKeyringController.memStore.getState(),
    keyringController.memStore.getState()
  );
});
