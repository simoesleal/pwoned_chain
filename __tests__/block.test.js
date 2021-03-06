const Block = require("../src/Block");
const cryptoHash = require("../src/internals/crypto-hash");
const GENESIS_DATA = {
  timestamp: 1,
  lastHash: "----",
  hash: "hash-one",
  data: [],
};

describe("Block", () => {
  const timestamp = "a-date";
  const lastHash = "foo-lasHash";
  const hash = "bar-hash";
  const data = ["blockchain", "data"];
  const block = new Block({ timestamp, lastHash, hash, data });

  it("has a timestamp, lashHash, hash and data property", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  describe("genesis()", () => {
    const genesisBlock = Block.genesis();
    it("returns a Block instance", () => {
      expect(genesisBlock instanceof Block).toEqual(true);
    });

    it("returns the genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe("mineBlock()", () => {
    const lastBlock = Block.genesis();
    const data = "mined data";
    const mineBlock = Block.mineBlock(lastBlock, data);

    it("returns a Block instance", () => {
      expect(mineBlock instanceof Block).toBe(true);
    });

    it("sets the `lastHash` to be the `hash` of the lastBlock", () => {
      expect(mineBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("sets the `data`", () => {
      expect(mineBlock.data).toEqual(data);
    });

    it("sets a `timestamp`", () => {
      expect(mineBlock.timestamp).not.toEqual(undefined);
    });

    it("creates a SHA-256 `hash` based on the proper inputs", () => {
      expect(mineBlock.hash).toEqual(
        cryptoHash(mineBlock.timestamp, lastBlock.hash, data)
      );
    });
  });
});
