import { Fellow } from '../models'
import { useWorkspace } from './useWorkspace'
import bs58 from 'bs58'
// import getProvider from './getProvider'
// import { useAnchorWallet } from "@solana/wallet-adapter-react";
// import { Program } from '@project-serum/anchor'
// import { PublicKey } from '@solana/web3.js'
// import idl from '../idl/solana_program.json'


export const FetchFellows = async(filters = []) => {
    const { program } = useWorkspace()
        // const wallet = useAnchorWallet()
        // const provider = getProvider(wallet);
        // const programID = new PublicKey(idl.metadata.address)
        // const program = new Program(idl, programID, provider.value);

    const fellow = await program.value.account.fellow.all(filters);
    return fellow.map(fellow => new Fellow(fellow.publicKey, fellow.account))
}

export const nameFilter = name => ({
    memcmp: {
        offset: 8 + // Discriminator.
            32 + // Author public key.
            8 + // Timestamp.
            4, // Tag string prefix.
        bytes: bs58.encode(Buffer.from(name)),
    }
})