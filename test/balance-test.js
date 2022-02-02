const { expect } = require("chai");
const ReefAbi = require("./ReefToken.json");

describe.only("************ Balance ******************", () => {
    let balanceContractAddress, balanceContract, ownerAddress, owner, reefToken;

    before(async () => {
        // Uncomment or leave empty to deploy new contract
        balanceContractAddress = "";

        owner = await reef.getSignerByName("account1");
        ownerAddress = await owner.getAddress();

        const ReefToken = new ethers.Contract(
            "0x0000000000000000000000000000000001000000",
            ReefAbi,
            owner
        );
        reefToken = ReefToken.connect(owner);

        if (!balanceContractAddress || balanceContractAddress == "") {
            console.log("\tdeploying balance contract...");
            const BalanceContract = await reef.getContractFactory("GetBalance", owner);
            balanceContract = await BalanceContract.deploy();
            await balanceContract.deployed();
            balanceContractAddress = balanceContract.address;
        } else {
            const BalanceContract = await reef.getContractFactory("GetBalance", owner);
            balanceContract = await BalanceContract.attach(balanceContractAddress);
        }
        console.log(`\tBalance contact deployed ${balanceContractAddress}`);
    });

    it("Should get balance from contract", async () => {
        const bal1 = formatBigNumber(await reefToken.balanceOf(balanceContractAddress));
        console.log("bal1", bal1);
        const balCont1 = formatBigNumber(await balanceContract.getBalance());
        console.log("balCont1", balCont1);
        const balVar1 = formatBigNumber(await balanceContract.balanceVar());
        console.log("balVar1", balVar1);
        const owner1 = formatBigNumber(await reefToken.balanceOf(ownerAddress));
        console.log("owner1", owner1);
        console.log("\n");

        // expect(bal1).to.equal(balCont1);
        // expect(bal1).to.equal(balVar1);

        await balanceContract.deposit({ value: ethers.utils.parseUnits("1", "ether") });

        const bal2 = formatBigNumber(await reefToken.balanceOf(balanceContractAddress));
        console.log("bal2", bal2);
        const balCont2 = formatBigNumber(await balanceContract.getBalance());
        console.log("balCont2", balCont2);
        const balVar2 = formatBigNumber(await balanceContract.balanceVar());
        console.log("balVar2", balVar2);
        const owner2 = formatBigNumber(await reefToken.balanceOf(ownerAddress));
        console.log("owner2", owner2);
        console.log("\n");

        // expect(bal2).to.equal(bal1 + 1e18);
        // expect(bal2).to.equal(balCont2);
        // expect(bal2).to.equal(balVar2);

        await balanceContract.withdrawBalance();

        const bal3 = formatBigNumber(await reefToken.balanceOf(balanceContractAddress));
        console.log("bal3", bal3);
        const balCont3 = formatBigNumber(await balanceContract.getBalance());
        console.log("balCont3", balCont3);
        const balVar3 = formatBigNumber(await balanceContract.balanceVar());
        console.log("balVar3", balVar3);
        const owner3 = formatBigNumber(await reefToken.balanceOf(ownerAddress));
        console.log("owner3", owner3);
        console.log("\n");

        // expect(bal3).to.equal(0);
        // expect(bal3).to.equal(balCont3);
        // expect(bal3).to.equal(balVar3);

        await balanceContract.deposit({ value: ethers.utils.parseUnits("2", "ether") });

        const bal4 = formatBigNumber(await reefToken.balanceOf(balanceContractAddress));
        console.log("bal4", bal4);
        const balCont4 = formatBigNumber(await balanceContract.getBalance());
        console.log("balCont4", balCont4);
        const balVar4 = formatBigNumber(await balanceContract.balanceVar());
        console.log("balVar4", balVar4);
        const owner4 = formatBigNumber(await reefToken.balanceOf(ownerAddress));
        console.log("owner4", owner4);
        console.log("\n");

        // expect(bal4).to.equal(2e18);
        // expect(bal4).to.equal(balCont4);
        // expect(bal4).to.equal(balVar4);

        await balanceContract.withdrawBalanceVar();

        const bal5 = formatBigNumber(await reefToken.balanceOf(balanceContractAddress));
        console.log("bal5", bal5);
        const balCont5 = formatBigNumber(await balanceContract.getBalance());
        console.log("balCont5", balCont5);
        const balVar5 = formatBigNumber(await balanceContract.balanceVar());
        console.log("balVar5", balVar5);
        const owner5 = formatBigNumber(await reefToken.balanceOf(ownerAddress));
        console.log("owner5", owner5);
        console.log("\n");

        // expect(bal5).to.equal(0);
        // expect(bal5).to.equal(balCont5);
        // expect(bal5).to.equal(balVar5);
    });
});

formatBigNumber = (bigNumber) => {
    return Number(ethers.utils.formatUnits(bigNumber.toString(), "ether"));
};
