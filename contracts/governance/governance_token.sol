// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import {Nonces} from "@openzeppelin/contracts/utils/Nonces.sol";

contract EAstoreToken is ERC20, ERC20Permit, ERC20Votes {
    // this is the address of the Multisig contract that will be the minter
    address public minter;

    constructor(address _minter) ERC20("EAstore", "EAS") ERC20Permit("EAstore") {
        minter = _minter;
    }

    // modifier
    modifier onlyMinter() {
        require(msg.sender == minter, "only minter can mint");
        _;
    }

    // The functions below are overrides required by Solidity.

    function _update(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) onlyMinter {
        super._update(from, to, amount);
    }

    function nonces(
        address owner
    ) public view virtual override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }
}
