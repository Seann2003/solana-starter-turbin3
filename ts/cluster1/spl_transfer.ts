import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import wallet from "../dev-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("CJSyZM2fQGSGa9hMqAdUeki6iS2Ubowtzi8WoU9LCz8d");

// Recipient address
const to = new PublicKey("F3hXDDWbEFGyUmo5VHeV7fDXwZ8NwNZSdjmKLJuJsAWB");

(async () => {
  try {
    const fromAta = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );
    const toAta = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      to
    );
    // Transfer the new token to the "toTokenAccount" we just created
    const transferTx = await transfer(
      connection,
      keypair,
      fromAta.address,
      toAta.address,
      keypair.publicKey,
      1
    );
    console.log(`Success! Check out your TX here: ${transferTx}`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
