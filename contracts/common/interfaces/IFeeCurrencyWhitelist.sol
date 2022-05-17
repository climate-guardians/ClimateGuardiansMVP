// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface IFeeCurrencyWhitelist {
  function addToken(address) external;
  function getWhitelist() external view returns (address[] memory);
}
