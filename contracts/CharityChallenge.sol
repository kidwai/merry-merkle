pragma solidity ^0.4.18;

contract CharityChallenge {

    address public charity;

    // Milestones correspond to notable levels of funds raised,
    // in terms the number of meals afforded for the 96 homeless
    // youths (at ~ $3/meal and $700/eth)

    // We will need the exchange rate to connect to meal prices.
    uint public eth_usd;

    uint public milestone = 0;
    uint[5] public milestones = [
        2100,                           // 1 week
        8400,                           // 1 month
        25200,                          // 3 months
        50400,                          // 6 months
        100800                          // 1 year
    ];


    uint public end_block;
    uint public raised;


    struct Donation {
        address from;
        bytes32 message;
        uint8[3] rgb;
        uint value;
    }
    
    
    
    Donation[128] public leaderBoard;

    mapping (uint => address) public donors;


    function CharityChallenge(
        address _charity,
        uint _eth_usd,
        uint _duration
    ) public {
        charity = _charity;
        eth_usd = _eth_usd;
        end_block = block.number + _duration;
    }




    /**
      *   Challenge someone else's position in the leader board 
      *   by out-donating them.
      *
      *   The index i will be computed client-side according to
      *   the leader board state.
      *
      *   A message and colour can then be supplied to customize
      *   spots on the leader board.
    **/
    function challenge (uint i, bytes32 message, uint8[3] rgb) payable public {
        require (i < leaderBoard.length && block.number < end_block);
        require (leaderBoard[i].value < msg.value);
        leaderBoard[i] = Donation({
                from: msg.sender,
                message: message,
                rgb: rgb,
                value: msg.value
            });
        charity.transfer(msg.value);
        Challenge(msg.sender, i);
        
        
        raised += msg.value*eth_usd/10**18;
        
        // trigger a milestone event if achieved
        if (milestones[milestone] < raised && 
            milestones[milestone] >= raised - msg.value)
            Milestone(milestone++);
    }


    /**
      *  Simple donation just forwards to charity
    **/
    function () payable public {
        require (block.number < end_block);
        charity.transfer(msg.value);
        Donate(msg.sender, msg.value);
        raised += msg.value*eth_usd/10**18;
    }



    event Donate (address indexed from, uint amount);
    event Milestone(uint i);
    event Challenge (address indexed from, uint index);

}
