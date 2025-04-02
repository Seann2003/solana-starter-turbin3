import {
  Keypair,
  PublicKey,
  Connection,
  type Commitment,
} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import wallet from "../dev-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("CJSyZM2fQGSGa9hMqAdUeki6iS2Ubowtzi8WoU9LCz8d");

(async () => {
  try {
    // Create an ATA
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );
    console.log(`Your ata is: ${ata.address.toBase58()}`);
    // Mint to ATA
    const mintTx = await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair.publicKey,
      token_decimals
    );
    console.log(
      `https://explorer.solana.com/transaction/${mintTx}?cluster=devnet`
    );
    console.log(`Your mint txid: ${mintTx}`);
    return mint;
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
