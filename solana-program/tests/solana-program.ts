import { Program } from "@project-serum/anchor";
import * as bs58 from "bs58";
import { SolanaProgram } from "../target/types/solana_program";

const anchor = require("@project-serum/anchor");
const assert = require("assert");

describe("solanaProgram", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.SolanaProgram as Program<SolanaProgram>

  it('can send a new fellow', async () => {
      const fellow = anchor.web3.Keypair.generate();
      await program.rpc.sendFellow('Anam Ansari', 'anamansari062', '22.SUM.10', 'Pod-Name', 'Solana Replay', 'Link', 'token', {
          accounts: {
              fellow: fellow.publicKey,
              author: program.provider.wallet.publicKey,
              systemProgram: anchor.web3.SystemProgram.programId,
          },
          signers: [fellow],
      });
      const fellowAccount = await program.account.fellow.fetch(fellow.publicKey);
  	  console.log(fellowAccount);

      assert.equal(fellowAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
      assert.equal(fellowAccount.name, 'Anam Ansari');
      assert.equal(fellowAccount.githubUsername, 'anamansari062');
      assert.equal(fellowAccount.podNumber, '22.SUM.10');
      assert.equal(fellowAccount.podName, 'Pod-Name');
      assert.equal(fellowAccount.project, 'Solana Replay');
      assert.equal(fellowAccount.pictureLink, 'Link');
      assert.equal(fellowAccount.token, 'token');
      assert.ok(fellowAccount.timestamp);
  });

  
  it('can send a new fellow from a different author', async () => {
    // Generate another user and airdrop them some SOL.
    const otherUser = anchor.web3.Keypair.generate();

    // Call the "Sendfellow" instruction on behalf of this other user.
    const fellow = anchor.web3.Keypair.generate();
    const signature = await program.provider.connection.requestAirdrop(otherUser.publicKey, 1000000000);
    await program.provider.connection.confirmTransaction(signature);
    
    await program.rpc.sendFellow('New Fellow', 'fellow', '22.SUM.10', 'Pod-Name', 'Project', 'Link', 'token', {
        accounts: {
            fellow: fellow.publicKey,
            author: otherUser.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [otherUser, fellow],
    });

    // Fetch the account details of the created fellow.
    const fellowAccount = await program.account.fellow.fetch(fellow.publicKey);

    // Ensure it has the right data.
    assert.equal(fellowAccount.author.toBase58(), otherUser.publicKey.toBase58());
    assert.equal(fellowAccount.name, 'New Fellow');
    assert.equal(fellowAccount.githubUsername, 'fellow');
    assert.equal(fellowAccount.podNumber, '22.SUM.10');
    assert.equal(fellowAccount.podName, 'Pod-Name');
    assert.equal(fellowAccount.project, 'Project');
    assert.equal(fellowAccount.pictureLink, 'Link');
    assert.equal(fellowAccount.token, 'token');
    assert.ok(fellowAccount.timestamp);
  });

  
});

