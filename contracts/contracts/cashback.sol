// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract reward {
    address private owner;
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    function fund() public payable {
        require(msg.value > 2 ether, "Didn't send enough!");
    }

    function sendReward(address payable _to, uint256 rebate) public payable {
        if (rebate == 1) {
            uint256 prizeAmount = 0.1 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (_to).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        } else {
            uint256 prizeAmount = 0.2 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (_to).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }
    }

    function RewardsFornumberOfSectorbought(uint256 counter, address payable _to) public {
        uint256 value = (counter / 10) * 10 * 18;

        (bool success, ) = (_to).call{value: value}("");
        require(success, "Failed to withdraw money from contract.");
    }

    receive() external payable {}

    fallback() external payable {}
}
