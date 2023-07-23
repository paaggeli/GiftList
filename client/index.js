const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';
async function main() {
  // Create the Merkle Tree
  const merkleTree = new MerkleTree(niceList);
  // send to server:
  // 1. the name we want to check
  const name = 'Norman Block';
  // 2. the proof (getProof)
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
  });

  console.log({ gift });
}

main();