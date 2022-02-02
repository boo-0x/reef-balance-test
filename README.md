BalanceTest is a simple contract with functions to get the balance through "address(this).balance" and though a state variable.

The tests expect to get the same results by calling this methods and by callint the "balanceOf()" function of the Reef token. However, the results in the test are different.

## Steps to reproduce

-   Remove the _.example_ from the _.env.example_ file.
-   Add seeds of an account with balance in the test network.
-   Run:

```shell
yarn hardhat test
```
