#!/usr/bin/env node
/**
 * Decode React 19.2 useId treeId strings (base32) into bit strings and
 * attempt to parse them into plausible (bitWidth, value) fork sequences.
 *
 * React algorithm (react-dom mountId/pushTreeId):
 *   - Each fork level: value = index+1 (1-based), bitWidth = 32-clz32(totalChildren)
 *   - Bits are packed MSB-first: shallower forks occupy higher bits.
 *   - id string = (packed number without leading 1 bit).toString(32)
 */

const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";

function fromBase32(str) {
  let n = 0n;
  for (const ch of str) {
    const v = ALPHABET.indexOf(ch);
    if (v < 0) throw new Error(`bad char: ${ch}`);
    n = n * 32n + BigInt(v);
  }
  return n;
}

function toBits(n) {
  if (n === 0n) return "0";
  let bits = "";
  let v = n;
  while (v > 0n) {
    bits = (v & 1n).toString() + bits;
    v >>= 1n;
  }
  return bits;
}

const server = "17cl5esndlb";
const client = "9r55esndlb";

const sBits = toBits(fromBase32(server));
const cBits = toBits(fromBase32(client));

console.log("server bits (%d): %s", sBits.length, sBits);
console.log("client bits (%d): %s", cBits.length, cBits);

// Common suffix (LSB side = deepest forks)
let i = sBits.length - 1,
  j = cBits.length - 1;
while (i >= 0 && j >= 0 && sBits[i] === cBits[j]) {
  i--;
  j--;
}
console.log("\ncommon deep suffix: %s", sBits.slice(i + 1));
console.log("server shallow prefix (%d bits): %s", i + 1, sBits.slice(0, i + 1));
console.log("client shallow prefix (%d bits): %s", j + 1, cBits.slice(0, j + 1));

// Try to parse each bit string into (width, value) pairs for plausible
// totalChildren sizes. Greedy parse from LSB (deepest) side, since deep
// structure is known-ish: fork widths for common totals:
//   2 children -> 1 bit, 3-4 -> 2 bits, 5-8 -> 3 bits, 9-16 -> 4 bits, 17-32 -> 5 bits
function parseFromBits(bits) {
  // attempt: parse from MSB (shallow) with a sequence of widths
  // we search combinations of widths [1..5] that exactly tile the bit string,
  // each chunk value must be >= 1 (index+1 >= 1) and < 2^width
  const results = [];
  function walk(pos, acc) {
    if (pos === bits.length) {
      results.push([...acc]);
      return;
    }
    if (results.length > 40) return; // cap
    for (let w = 1; w <= 5 && pos + w <= bits.length; w++) {
      const chunk = bits.slice(pos, pos + w);
      const val = parseInt(chunk, 2);
      // value must fit: 1 <= val <= 2^w - 1 (index+1 <= totalChildren-... actually
      // totalChildren in [2^(w-1)+1 .. 2^w], and val <= totalChildren, so val <= 2^w)
      if (val >= 1 && val <= 2 ** w && (val >= 2 || w === 1)) {
        acc.push({ w, val, totalRange: [2 ** (w - 1) + 1, 2 ** w] });
        walk(pos + w, acc);
        acc.pop();
      }
    }
  }
  walk(0, []);
  return results;
}

console.log("\n--- server parse options (width,val => totalChildren range) ---");
for (const r of parseFromBits(sBits).slice(0, 8)) {
  console.log(
    r.map((x) => `[w${x.w} v${x.val} tot ${x.totalRange[0]}-${x.totalRange[1]}]`).join(" ")
  );
}
console.log("\n--- client parse options ---");
for (const r of parseFromBits(cBits).slice(0, 8)) {
  console.log(
    r.map((x) => `[w${x.w} v${x.val} tot ${x.totalRange[0]}-${x.totalRange[1]}]`).join(" ")
  );
}
