import * as anchor from "@project-serum/anchor";
import { Program, web3 } from "@project-serum/anchor";
import {
  createMint,
  getMint,
  getOrCreateAssociatedTokenAccount,
  getAccount,
  mintTo,
  AccountLayout,
  TOKEN_PROGRAM_ID,
  transfer,
  approve,
  approveChecked,
} from "@solana/spl-token";
import { SplTokenCpi } from "../target/types/spl_token_cpi";

describe("spl_token_cpi", () => {
  // Configure the client to use the local cluster.
  const provider: anchor.Provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SplTokenCpi as Program<SplTokenCpi>;

  // it("Mint and Transfer", async () => {
  //   const payer: web3.Signer = web3.Keypair.fromSecretKey(
  //     Uint8Array.from([
  //       101, 228, 109, 143, 124, 24, 46, 195, 134, 77, 228, 147, 19, 219, 94,
  //       128, 216, 76, 246, 187, 223, 75, 245, 104, 156, 131, 163, 246, 106, 39,
  //       10, 85, 205, 66, 170, 119, 63, 59, 234, 169, 106, 180, 87, 42, 215, 104,
  //       231, 161, 237, 82, 74, 51, 16, 30, 28, 197, 91, 227, 105, 102, 21, 41,
  //       153, 189,
  //     ])
  //   );
  //   const mint = await createMint(
  //     provider.connection,
  //     payer,
  //     provider.wallet.publicKey,
  //     provider.wallet.publicKey,
  //     9
  //   );

  //   const tokenAccount = await getOrCreateAssociatedTokenAccount(
  //     provider.connection,
  //     payer,
  //     mint,
  //     payer.publicKey
  //   );

  //   await mintTo(
  //     provider.connection,
  //     payer,
  //     mint,
  //     tokenAccount.address,
  //     provider.wallet.publicKey,
  //     100
  //   );

  //   const mintInfo = await getMint(provider.connection, mint);

  //   console.log(mintInfo.supply); // 100

  //   const tokenAccountInfo = await getAccount(
  //     provider.connection,
  //     tokenAccount.address
  //   );

  //   console.log(tokenAccountInfo.amount); // 100

  //   // Get Tokens by owner
  //   (async () => {
  //     const tokenAccounts = await provider.connection.getTokenAccountsByOwner(
  //       provider.wallet.publicKey,
  //       {
  //         programId: TOKEN_PROGRAM_ID,
  //       }
  //     );

  //     console.log("Token                                         Balance");
  //     console.log(
  //       "------------------------------------------------------------"
  //     );
  //     tokenAccounts.value.forEach((e) => {
  //       const accountInfo = AccountLayout.decode(e.account.data);
  //       console.log(
  //         `${new web3.PublicKey(accountInfo.mint)}   ${accountInfo.amount}`
  //       );
  //     });
  //   })();

  //   // Create an associated token account for program
  //   const tokenAccount_program = await getOrCreateAssociatedTokenAccount(
  //     provider.connection,
  //     payer,
  //     mint,
  //     program.programId
  //   );

  //   await transfer(
  //     provider.connection,
  //     payer,
  //     tokenAccount.address,
  //     tokenAccount_program.address,
  //     provider.wallet.publicKey,
  //     50
  //   );

  //   (async () => {
  //     const tokenAccounts = await provider.connection.getTokenAccountsByOwner(
  //       provider.wallet.publicKey,
  //       {
  //         programId: TOKEN_PROGRAM_ID,
  //       }
  //     );

  //     console.log("Token                                         Balance");
  //     console.log(
  //       "------------------------------------------------------------"
  //     );
  //     tokenAccounts.value.forEach((e) => {
  //       const accountInfo = AccountLayout.decode(e.account.data);
  //       console.log(
  //         `${new web3.PublicKey(accountInfo.mint)}   ${accountInfo.amount}`
  //       );
  //     });
  //   })();

  //   (async () => {
  //     const tokenAccounts = await provider.connection.getTokenAccountsByOwner(
  //       program.programId,
  //       {
  //         programId: TOKEN_PROGRAM_ID,
  //       }
  //     );

  //     console.log("Token                                         Balance");
  //     console.log(
  //       "------------------------------------------------------------"
  //     );
  //     tokenAccounts.value.forEach((e) => {
  //       const accountInfo = AccountLayout.decode(e.account.data);
  //       console.log(
  //         `${new web3.PublicKey(accountInfo.mint)}   ${accountInfo.amount}`
  //       );
  //     });
  //   })();
  // });

  it("Mint and Approve", async () => {
    const payer: web3.Signer = web3.Keypair.fromSecretKey(
      Uint8Array.from([
        101, 228, 109, 143, 124, 24, 46, 195, 134, 77, 228, 147, 19, 219, 94,
        128, 216, 76, 246, 187, 223, 75, 245, 104, 156, 131, 163, 246, 106, 39,
        10, 85, 205, 66, 170, 119, 63, 59, 234, 169, 106, 180, 87, 42, 215, 104,
        231, 161, 237, 82, 74, 51, 16, 30, 28, 197, 91, 227, 105, 102, 21, 41,
        153, 189,
      ])
    );
    const mint = await createMint(
      provider.connection,
      payer,
      provider.wallet.publicKey,
      provider.wallet.publicKey,
      9
    );

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      payer,
      mint,
      payer.publicKey
    );

    await mintTo(
      provider.connection,
      payer,
      mint,
      tokenAccount.address,
      provider.wallet.publicKey,
      100
    );

    const mintInfo = await getMint(provider.connection, mint);

    console.log(mintInfo.supply); // 100

    const tokenAccountInfo = await getAccount(
      provider.connection,
      tokenAccount.address
    );

    console.log(tokenAccountInfo.amount); // 100

    // Get Tokens by owner
    (async () => {
      const tokenAccounts = await provider.connection.getTokenAccountsByOwner(
        provider.wallet.publicKey,
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );

      console.log("Token                                         Balance");
      console.log(
        "------------------------------------------------------------"
      );
      tokenAccounts.value.forEach((e) => {
        const accountInfo = AccountLayout.decode(e.account.data);
        console.log(
          `${new web3.PublicKey(accountInfo.mint)}   ${accountInfo.amount}`
        );
      });
    })();

    // Owner of Program (Authority)
    const owner_keypair = web3.Keypair.generate();

    const airdropSignature = await provider.connection.requestAirdrop(
      owner_keypair.publicKey,
      web3.LAMPORTS_PER_SOL
    );

    await provider.connection.confirmTransaction(airdropSignature);

    // Create an associated token account for program
    const tokenAccount_program = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      owner_keypair,
      mint,
      program.programId
    );

    // Approve 60 token to program token account
    await approve(
      provider.connection,
      payer,
      tokenAccount.address,
      tokenAccount_program.address,
      provider.wallet.publicKey,
      60
    );

    // Tranfer via CPI call
    await program.rpc.transferWrapper(new anchor.BN(60), {
      accounts: {
        sender: owner_keypair.publicKey,
        senderToken: tokenAccount.address,
        receiverToken: tokenAccount_program.address,
        mint: mint,
        tokenProgram: TOKEN_PROGRAM_ID,
      },

      signers: [owner_keypair],

      // Sender Signer is injected by anchor
    });
    (async () => {
      const tokenAccounts = await provider.connection.getTokenAccountsByOwner(
        provider.wallet.publicKey,
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );

      console.log("Token                                         Balance");
      console.log(
        "------------------------------------------------------------"
      );
      tokenAccounts.value.forEach((e) => {
        const accountInfo = AccountLayout.decode(e.account.data);
        console.log(
          `${new web3.PublicKey(accountInfo.mint)}   ${accountInfo.amount}`
        );
      });
    })();

    (async () => {
      const tokenAccounts = await provider.connection.getTokenAccountsByOwner(
        program.programId,
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );

      console.log("Token                                         Balance");
      console.log(
        "------------------------------------------------------------"
      );
      tokenAccounts.value.forEach((e) => {
        const accountInfo = AccountLayout.decode(e.account.data);
        console.log(
          `${new web3.PublicKey(accountInfo.mint)}   ${accountInfo.amount}`
        );
      });
    })();
  });
});
