const Block = require("./Block");
const cryptoHash = require("./internals/crypto-hash");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  static isValidChain(chain) {
    let response = true;

    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      response = false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, data } = chain[i];
      const actualLastHash = chain[i - 1].hash;
      const validatedHash = cryptoHash(timestamp, lastHash, data);

      if (lastHash !== actualLastHash) response = false;
      if (hash !== validatedHash) response = false;
    }

    return response;
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(newBlock);
  }
}

module.exports = Blockchain;
