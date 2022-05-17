// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface IFreezer {
  function isFrozen(address) external view returns (bool);
}
