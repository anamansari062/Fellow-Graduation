import { Fellow } from '../models'
// import { InitWorkspace, useWorkspace } from './useWorkspace'
import { web3 } from "@project-serum/anchor";
// import { useAnchorWallet } from "@solana/wallet-adapter-react";
// import { Connection, PublicKey } from '@solana/web3.js'
import { AnchorProvider, Program } from '@project-serum/anchor'
import idl from '../idl/solana_program.json'

// const clusterUrl = "https://api.devnet.solana.com"
// const preflightCommitment = 'processed'
// const commitment = 'processed'


// 1. Define the sendFellow endpoint.
export const SendFellow = async(provider, name, github_username, pod_number, pod_name, project, picture_link) => {
    // InitWorkspace()
    // const { wallet, program } = useWorkspace()
    // const wallet = useAnchorWallet()
    // const connection = new Connection(clusterUrl, commitment)
    // const provider = new AnchorProvider(connection, wallet.value, { preflightCommitment, commitment })
    const jsonString = JSON.stringify(idl)
    const idlJSON = JSON.parse(jsonString);

    // const programID = new PublicKey(idlJson.metadata.address)
    const program = new Program(idlJSON, idl.metadata.address, provider)

    // 2. Generate a new Keypair for our new fellow account.
    const fellow = web3.Keypair.generate()

    // 3. Send a "SendFellow" instruction with the right data and the right accounts.
    await program.methods.sendFellow(name, github_username, pod_number, pod_name, project, picture_link)
        .accounts({
            author: program.provider.wallet.publicKey,
            fellow: fellow.publicKey,
            systemProgram: web3.SystemProgram.programId,
        })
        .signers([fellow])
        .rpc()


    // 4. Fetch the newly created account from the blockchain.
    const fellowAccount = await program.account.fellow.fetch(fellow.publicKey)
    console.log(fellowAccount)
    console.log(new Fellow(fellow.publicKey, fellowAccount))

    // 5. Wrap the fetched account in a Fellow model so our frontend can display it.
    return new Fellow(fellow.publicKey, fellowAccount)
}