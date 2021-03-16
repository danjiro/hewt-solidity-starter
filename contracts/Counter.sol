pragma solidity ^0.6.8;

import "hardhat/console.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract Counter {
  using SafeMath for uint256;

  uint256 count = 0;

  event CountedTo(uint256 number);

  function getCount() public view returns (uint256) {
    console.log("getCount", count);
    return count;
  }

  function countUp() public returns (uint256) {
    count = count.add(1);

    console.log("countUp: count=", count);

    emit CountedTo(count);
    return count;
  }

  function countDown() public returns (uint256) {
    count = count.sub(1);
    console.log("countDown: count=", count);
    emit CountedTo(count);
    return count;
  }
}
