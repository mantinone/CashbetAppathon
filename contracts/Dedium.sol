pragma solidity 0.4.23;

contract Dedium {
    address public owner;

    struct StorageItem {
        string storageAddress;
    }

    mapping(string => StorageItem) storageAddressList;

    function kill() public {
        owner = msg.sender;
        if(msg.sender == owner) selfdestruct(owner);
    }
    function create(string storageAddressInput, string title) public {
        storageAddressList[title].storageAddress = storageAddressInput;
    }
    function getAddressByTitle(string title) view public returns (string) {
        return storageAddressList[title].storageAddress;
    }
}