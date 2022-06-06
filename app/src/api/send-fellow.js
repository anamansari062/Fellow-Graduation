import { Fellow } from '../models'
import { useWorkspace } from './useWorkspace'

// 1. Define the sendFellow endpoint.
export const SendFellow = async(name, github_username, pod_number, pod_name, project, picture_link) => {
    const { wallet, program } = useWorkspace()

    // 2. Generate a new Keypair for our new fellow account.
    const fellow = web3.Keypair.generate()

    // 3. Send a "SendFellow" instruction with the right data and the right accounts.
    await program.value.rpc.sendFellow(name, github_username, pod_number, pod_name, project, picture_link, {
        accounts: {
            author: wallet.value.publicKey,
            fellow: fellow.publicKey,
            systemProgram: web3.SystemProgram.programId,
        },
        signers: [fellow]
    })

    // 4. Fetch the newly created account from the blockchain.
    const fellowAccount = await program.value.account.fellow.fetch(fellow.publicKey)
    console.log(fellowAccount)
    console.log(new Fellow(fellow.publicKey, fellowAccount))

    // 5. Wrap the fetched account in a Fellow model so our frontend can display it.
    return new Fellow(fellow.publicKey, fellowAccount)
}