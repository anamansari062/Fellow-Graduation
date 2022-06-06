import { useWorkspace } from './useWorkspace'
import { Fellow } from '@/models'
// import getProvider from './getProvider';

export const GetFellow = async(publicKey) => {
    const { program } = useWorkspace()
        // const wallet = useAnchorWallet()
        // const provider = getProvider(wallet);
        // const program = new Program(idl, programID, provider.value);

    const account = await program.value.account.fellow.fetch(publicKey);
    return new Fellow(publicKey, account)
}