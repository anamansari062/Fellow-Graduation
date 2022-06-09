import { AnchorProvider } from "@project-serum/anchor";
import { Connection } from "@solana/web3.js";

const clusterUrl = "https://api.devnet.solana.com"
const preflightCommitment = 'processed'
const commitment = 'processed'

/**
 *
 * @returns provider to the caller.
 */
export default function get_provider(wallet) {
    if (!wallet) {
        return null;
    }

    /* Create the provider and return it to the caller */
    const connection = new Connection(clusterUrl, commitment)

    return new AnchorProvider(
        connection, wallet, { "preflightCommitment": preflightCommitment },
    )
}