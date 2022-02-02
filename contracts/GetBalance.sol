// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract GetBalance {
    uint256 public balanceVar;

    constructor() payable {
        balanceVar += msg.value;
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function withdrawBalanceVar() external {
        payable(msg.sender).transfer(balanceVar);
        balanceVar = 0;
    }

    function withdrawBalance() external {
        payable(msg.sender).transfer(address(this).balance);
        balanceVar = 0;
    }

    function deposit() external payable {
        balanceVar += msg.value;
    }
}
