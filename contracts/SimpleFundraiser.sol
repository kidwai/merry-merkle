pragma solidity ^0.4.18;


contract SimpleFundraiser {

  uint cost = 10**18;

  function setLight(uint8 r, uint8 g, uint8 b) payable public {
      require (msg.value >= cost);
      Light(r, g, b);
      Donation(msg.sender, msg.value); 
  }

  function () payable public {
    Donation(msg.sender, msg.value);
  }

  
  event Light(uint8 r, uint8 g, uint8 b);
  event Donation (address indexed from, uint value);
}
