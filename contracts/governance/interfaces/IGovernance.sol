// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface IGovernance {
  function isVoting(address) external view returns (bool);
}
