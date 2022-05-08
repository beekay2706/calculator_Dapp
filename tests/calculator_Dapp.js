const assert = require('assert')
const anchor = require('@project-serum/anchor')
const {SystemProgram} = anchor.web3
describe('calculator_Dapp', () => {
    const provider = anchor.AnchorProvider.local();
    anchor.setProvider(provider);
    const calculator = anchor.web3.Keypair.generate()
    const program = anchor.workspace.calculator_Dapp

    it('creates a calculator', async() => {
        await program.rpc.create("Welcome to Barath's calculator Dapp", {
            accounts: {
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            },
            signers: [calculator]
        })
        const account = program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.greeting === "Welcome to Barath's calculator Dapp")
    })


})