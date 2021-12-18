const Block = require("../src/Block");

describe("Block", () => {
  const timestamp = "a-date";
  const lastHash = "foo-lasHash";
  const hash = "bar-hash";
  const data = ["blockchain", "data"];
  const block = new Block(timestamp, lastHash, hash, data);

  it("has a timestamp, lashHash, hash and data property", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });
});
