pragma solidity ^0.4.18;


contract MerryMerkle {
    
    struct Donor {
        uint donation;
        bytes32 recognition;
    }
    
    struct MerryMerkle {
        mapping (uint => uint8[3]) rgb;
        uint height;
    }
    
    function update (
        MerryMerkle storage m, 
        uint index, 
        uint8[3] rgb) internal returns (bool) {
            require (index < 2**m.height);

            while (index > 0) {
                m.rgb[index] = rgb;
                index /= 2; // parent
            }
            return true;
    }
    
    MerryMerkle public mm;
    mapping (address => Donor) public donors;
    uint[3] costs = [5*10**18, 10*10**18, 100*10**18];

    uint index;
    
    
    
    function setRecognition (bytes32 recognition) payable public returns (bool) {
        require (msg.value >= costs[2]);
        donors[msg.sender].recognition = recognition;
        Donation(msg.sender, msg.value);
        return true;
    }
    
    
    function setSong(uint8 song) payable public returns (bool) {
        // todo
        require(msg.value >= costs[1]);
        Donation(msg.sender, msg.value);
        return true;
    }


    function setLight(uint8[3] rgb) payable public returns (bool) {
        require (msg.value >= costs[0]);
        update(mm, index, rgb);
        index = index + 1 % 2**mm.height;
        Donation(msg.sender, msg.value);
    }

    
    function () public payable {
        donors[msg.sender].donation += msg.value;
        Donation(msg.sender, msg.value);
    }
    
    
    event Donation(address indexed from, uint value);
    
}