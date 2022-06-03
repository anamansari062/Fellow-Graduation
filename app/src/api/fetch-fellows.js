import { Fellow } from '@/models'
import { useWorkspace } from './useWorkspace'
import bs58 from 'bs58'

export const fetchFellows = async(filters = []) => {
    const { program } = useWorkspace()

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