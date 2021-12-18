const cryptoHash = require("./internals/crypto-hash");

const GENESIS_DATA = {
  timestamp: 1,
  lastHash: "----",
  hash: "hash-one",
  data: [],
};
class Block {
  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock(lastblock, data) {
    const timestamp = Date.now();
    const lastHash = lastblock.hash;

    return new this({
      timestamp: timestamp,
      lastHash: lastHash,
      data,
      hash: cryptoHash(timestamp, lastHash, data),
    });
  }
}

module.exports = Block;
