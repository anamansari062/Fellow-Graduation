import './mintnft.css'

import { clusterApiUrl, 
    Connection, 
    Keypair, 
    LAMPORTS_PER_SOL, 
    Transaction, 
    sendAndConfirmTransaction 
} from '@solana/web3.js';
import { 
    createMint, 
    getOrCreateAssociatedTokenAccount, 
    mintTo, 
    createSetAuthorityInstruction, 
    AuthorityType
} from '@solana/spl-token';
import React from "react";
// Special setup to add a Buffer class, because it's missing
window.Buffer = window.Buffer || require("buffer").Buffer;
export default function MintNFT() {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    // Generate a new wallet keypair and airdrop SOL
    const fromWallet = Keypair.generate();
	let fromTokenAccount; 
	let mint;

    async function createNft() {
        const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirdropSignature);
    
        // Create new NFT mint
        mint = await createMint(
            connection, 
            fromWallet, 
            fromWallet.publicKey, 
            null, 
            0 // only allow whole tokens
        );
            
        console.log(`Create NFT: ${mint.toBase58()}`);
    
        // Get the NFT account of the fromWallet address, and if it does not exist, create it
        fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            fromWallet,
            mint,
            fromWallet.publicKey
        );

        console.log(`Create NFT Account: ${fromTokenAccount.address.toBase58()}`);
        alert("NFT mint created");
    }
    async function mintNft() {
        // Mint 1 new token to the "fromTokenAccount" account we just created
        const signature = await mintTo(
            connection,
            fromWallet,
            mint,
            fromTokenAccount.address,
            fromWallet.publicKey,
            1
        );
        console.log(`Mint signature: ${signature}`);
        alert("NFT minted");
    }
    async function lockNft() {
        // Create our transaction to change minting permissions
        let transaction = new Transaction().add(createSetAuthorityInstruction(
            mint,
            fromWallet.publicKey,
            AuthorityType.MintTokens,
            null
        ));
      
        // Send transaction
        const signature = await sendAndConfirmTransaction(connection, transaction, [fromWallet]);
        console.log(`Lock signature: ${signature}`);
        // alert("NFT locked");
        window.location.href="https://opensea.io/collection/mlhfellowship-grads"

    }

    return (
        <div className="login-box">
            <h2>Mint Nft Section</h2>
            <form>
            <div className='common'>
                <button className="fileButton" onClick={createNft}>Create NFT</button>
                <button className="fileButton"  onClick={mintNft}>Mint NFT</button>
                <button className="fileButton"  onClick={lockNft}>Lock NFT</button>
            </div>
            </form>
        </div>
    );
}
