pragma solidity 0.4.23;

contract Casino {
    address public owner;
    mapping(string => string) public storageAddressList;

    function kill() public {
        owner = msg.sender;
        if(msg.sender == owner) selfdestruct(owner);
    }
    function create(string storageAddress, string title) public {
        storageAddressList[title] = storageAddress;
    }
    function getAddressByTitle(string title) public returns (string) {
        return storageAddressList[title];
    }
}