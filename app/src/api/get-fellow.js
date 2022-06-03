import { useWorkspace } from './useWorkspace'
import { Fellow } from '@/models'

export const getFellow = async(publicKey) => {
    const { program } = useWorkspace()
    const account = await program.value.account.fellow.fetch(publicKey);
    return new Fellow(publicKey, account)
}