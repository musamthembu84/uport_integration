pragma solidity >=0.4.21 <0.7.0;

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping (uint => Candidate) public candidates;
    mapping (address => bool) public voters; //store accounts that have voted
    uint public candidatesCount;

    constructor () public {
        addCandidates("Sasco");
        addCandidates("EFFSC");
        addCandidates("Daso");
    }

    function addCandidates(string memory _name) private{
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount,_name,0);
    }

    event votedEvent(
        uint indexed _candidateId
    );

    function vote (uint _candidateId) public {
        require(!voters[msg.sender]); //requires that person has not voted before;

        require(_candidateId > 0 && _candidateId<=candidatesCount); //requires a valid candidate

        voters[msg.sender]=true; //recording vote

        candidates[_candidateId].voteCount ++; //update candidatesCount

        emit votedEvent(_candidateId); //prove of vote

    }


}
