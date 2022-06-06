// import { AnchorProvider } from "@project-serum/anchor";
// import { Connection } from "@solana/web3.js";

// /**
//  *
//  * @returns provider to the caller.
//  */
// const clusterUrl = "https://api.devnet.solana.com"
// const preflightCommitment = 'processed'
// const commitment = 'processed'

// export default function getProvider(wallet) {
//     if (!wallet) {
//         return null;
//     }

//     /* Create the provider and return it to the caller */
//     const connection = new Connection(clusterUrl, commitment)

//     return new Provider(
//         connection, wallet, { "preflightCommitment": preflightCommitment },
//     )
// }