import crypto = require("crypto");

class BloomFilter {
  bitset: number[];
  hashes: string[];

  constructor(bitmap: number[], hashes: string[]) {
    this.bitset = bitmap;
    this.hashes = hashes;
  }

  getIndexes(item: string) {
    return this.hashes.map(hashName => {
      let hash = crypto.createHash(hashName);
      let hex = hash.update(item).digest('hex');
      return parseInt(hex, 16) % (this.bitset.length - 1) + 1
    });
  }

  add(item: string) {
    this.getIndexes(item)
      .forEach(index => {
        this.bitset[index] = 1;
      });
  }

  addItems(items: string[]) {
    items.forEach(item => {
      this.add(item);
    });
  }

  check(item: string) {
    let bitset = Array.from({length: this.bitset.length}, () => 0);
    this.getIndexes(item).forEach(index => {
      bitset[index] = 1;
    });

    for (var i=0; i < bitset.length; i++) {
      if (this.bitset[i] == 0 && bitset[i] == 1) {
        return false
      }
    }

    return true
  }
}

let bitset = Array.from({length: 100}, () => 0);
let bf = new BloomFilter(bitset, crypto.getHashes().slice(0, 7));

let words = ["penguin", "ice", "glacier", "pole", "mammoth", "seal"];
bf.addItems(words);
console.log("added words: " + words);

console.log("hyoga: " + bf.check("hyoga"));
console.log("glacier : " + bf.check("glacier"));
console.log("penguin: " + bf.check("penguin"));
console.log("inu: " + bf.check("inu"));

