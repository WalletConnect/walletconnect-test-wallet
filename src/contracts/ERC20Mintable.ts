export default {
  "contractName": "ERC20Mintable",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "spender",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "sender",
          "type": "address"
        },
        {
          "name": "recipient",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "spender",
          "type": "address"
        },
        {
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "account",
          "type": "address"
        }
      ],
      "name": "addMinter",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "renounceMinter",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "spender",
          "type": "address"
        },
        {
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "recipient",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "account",
          "type": "address"
        }
      ],
      "name": "isMinter",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "account",
          "type": "address"
        }
      ],
      "name": "MinterAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "account",
          "type": "address"
        }
      ],
      "name": "MinterRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "account",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "metadata": "{\"compiler\":{\"version\":\"0.5.7+commit.6da8b019\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"constant\":false,\"inputs\":[{\"name\":\"spender\",\"type\":\"address\"},{\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"sender\",\"type\":\"address\"},{\"name\":\"recipient\",\"type\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"spender\",\"type\":\"address\"},{\"name\":\"addedValue\",\"type\":\"uint256\"}],\"name\":\"increaseAllowance\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"account\",\"type\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"mint\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"account\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"account\",\"type\":\"address\"}],\"name\":\"addMinter\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"renounceMinter\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"spender\",\"type\":\"address\"},{\"name\":\"subtractedValue\",\"type\":\"uint256\"}],\"name\":\"decreaseAllowance\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"recipient\",\"type\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"account\",\"type\":\"address\"}],\"name\":\"isMinter\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"owner\",\"type\":\"address\"},{\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"account\",\"type\":\"address\"}],\"name\":\"MinterAdded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"account\",\"type\":\"address\"}],\"name\":\"MinterRemoved\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"}],\"devdoc\":{\"details\":\"Extension of `ERC20` that adds a set of accounts with the `MinterRole`, which have permission to mint (create) new tokens as they see fit. * At construction, the deployer of the contract is the only minter.\",\"methods\":{\"allowance(address,address)\":{\"details\":\"See `IERC20.allowance`.\"},\"approve(address,uint256)\":{\"details\":\"See `IERC20.approve`.     * Requirements:     * - `spender` cannot be the zero address.\"},\"balanceOf(address)\":{\"details\":\"See `IERC20.balanceOf`.\"},\"decreaseAllowance(address,uint256)\":{\"details\":\"Atomically decreases the allowance granted to `spender` by the caller.     * This is an alternative to `approve` that can be used as a mitigation for problems described in `IERC20.approve`.     * Emits an `Approval` event indicating the updated allowance.     * Requirements:     * - `spender` cannot be the zero address. - `spender` must have allowance for the caller of at least `subtractedValue`.\"},\"increaseAllowance(address,uint256)\":{\"details\":\"Atomically increases the allowance granted to `spender` by the caller.     * This is an alternative to `approve` that can be used as a mitigation for problems described in `IERC20.approve`.     * Emits an `Approval` event indicating the updated allowance.     * Requirements:     * - `spender` cannot be the zero address.\"},\"mint(address,uint256)\":{\"details\":\"See `ERC20._mint`.     * Requirements:     * - the caller must have the `MinterRole`.\"},\"totalSupply()\":{\"details\":\"See `IERC20.totalSupply`.\"},\"transfer(address,uint256)\":{\"details\":\"See `IERC20.transfer`.     * Requirements:     * - `recipient` cannot be the zero address. - the caller must have a balance of at least `amount`.\"},\"transferFrom(address,address,uint256)\":{\"details\":\"See `IERC20.transferFrom`.     * Emits an `Approval` event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of `ERC20`;     * Requirements: - `sender` and `recipient` cannot be the zero address. - `sender` must have a balance of at least `value`. - the caller must have allowance for `sender`'s tokens of at least `amount`.\"}}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/home/nventuro/dev/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol\":\"ERC20Mintable\"},\"evmVersion\":\"petersburg\",\"libraries\":{},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[]},\"sources\":{\"/home/nventuro/dev/openzeppelin-solidity/contracts/access/Roles.sol\":{\"keccak256\":\"0xb002c378d7b82a101bd659c341518953ca0919d342c0a400196982c0e7e7bcdb\",\"urls\":[\"bzzr://bd34c1ce05b5b2b3a62fc02e160f6805b1cadd476854664f433c685b2fda8dad\"]},\"/home/nventuro/dev/openzeppelin-solidity/contracts/access/roles/MinterRole.sol\":{\"keccak256\":\"0x63da54a7a5d4e4d82ac8d1f4f7f995fd8ef2b5fe1f2960b83e534fa37fb60910\",\"urls\":[\"bzzr://cea53b805426e40efadb24f2613aca39182462e9ecd23fde7aacf0c4b5885aaf\"]},\"/home/nventuro/dev/openzeppelin-solidity/contracts/math/SafeMath.sol\":{\"keccak256\":\"0x4ccf2d7b51873db1ccfd54ca2adae5eac3b184f9699911ed4490438419f1c690\",\"urls\":[\"bzzr://1604f5b6d6e916c154efd8c6720cda069e5ba32dfa0a9dedf2b42e5b02d07f89\"]},\"/home/nventuro/dev/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol\":{\"keccak256\":\"0x852793a3c2f86d336a683b30d688ec3dcfc57451af5a2bf5975cda3b7191a901\",\"urls\":[\"bzzr://07fb42206812a17c1f71e548cfa5cec6f9aa1ae0ca5df870718ca4aa9759d1a5\"]},\"/home/nventuro/dev/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol\":{\"keccak256\":\"0x6df8d686813b2875e99928ecd07bf8ee6d7473bc6a95eb1190e8fdba86beda76\",\"urls\":[\"bzzr://b4a3a1136392be8723a0d9627d1626323e3891c98e88ca5ab48da1dada375580\"]},\"/home/nventuro/dev/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0x90e8c2521653bbb1768b05889c5760031e688d9cd361f167489b89215e201b95\",\"urls\":[\"bzzr://aa8b45b57edafc3d67bc5d916327ea16807fae33f753ca163ae0c4061b789766\"]}},\"version\":1}",
  "bytecode": "0x60806040526100133361001860201b60201c565b610235565b61003081600361007660201b6111ce1790919060201c565b8073ffffffffffffffffffffffffffffffffffffffff167f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f660405160405180910390a250565b610086828261015760201b60201c565b156100f9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f526f6c65733a206163636f756e7420616c72656164792068617320726f6c650081525060200191505060405180910390fd5b60018260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156101de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806116d76022913960400191505060405180910390fd5b8260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b611493806102446000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063983b2d5611610071578063983b2d56146102e7578063986502751461032b578063a457c2d714610335578063a9059cbb1461039b578063aa271e1a14610401578063dd62ed3e1461045d576100b4565b8063095ea7b3146100b957806318160ddd1461011f57806323b872dd1461013d57806339509351146101c357806340c10f191461022957806370a082311461028f575b600080fd5b610105600480360360408110156100cf57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506104d5565b604051808215151515815260200191505060405180910390f35b6101276104ec565b6040518082815260200191505060405180910390f35b6101a96004803603606081101561015357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506104f6565b604051808215151515815260200191505060405180910390f35b61020f600480360360408110156101d957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506105a7565b604051808215151515815260200191505060405180910390f35b6102756004803603604081101561023f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061064c565b604051808215151515815260200191505060405180910390f35b6102d1600480360360208110156102a557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506106c0565b6040518082815260200191505060405180910390f35b610329600480360360208110156102fd57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610708565b005b610333610772565b005b6103816004803603604081101561034b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061077d565b604051808215151515815260200191505060405180910390f35b6103e7600480360360408110156103b157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610822565b604051808215151515815260200191505060405180910390f35b6104436004803603602081101561041757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610839565b604051808215151515815260200191505060405180910390f35b6104bf6004803603604081101561047357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610856565b6040518082815260200191505060405180910390f35b60006104e23384846108dd565b6001905092915050565b6000600254905090565b6000610503848484610ad4565b61059c843361059785600160008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610d7090919063ffffffff16565b6108dd565b600190509392505050565b6000610642338461063d85600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610df990919063ffffffff16565b6108dd565b6001905092915050565b600061065733610839565b6106ac576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260308152602001806113ac6030913960400191505060405180910390fd5b6106b68383610e81565b6001905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b61071133610839565b610766576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260308152602001806113ac6030913960400191505060405180910390fd5b61076f8161103c565b50565b61077b33611096565b565b6000610818338461081385600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610d7090919063ffffffff16565b6108dd565b6001905092915050565b600061082f338484610ad4565b6001905092915050565b600061084f8260036110f090919063ffffffff16565b9050919050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610963576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806114446024913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156109e9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602281526020018061138a6022913960400191505060405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040518082815260200191505060405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610b5a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602581526020018061141f6025913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610be0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001806113676023913960400191505060405180910390fd5b610c31816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610d7090919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610cc4816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610df990919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b600082821115610de8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525060200191505060405180910390fd5b600082840390508091505092915050565b600080828401905083811015610e77576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610f24576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f45524332303a206d696e7420746f20746865207a65726f20616464726573730081525060200191505060405180910390fd5b610f3981600254610df990919063ffffffff16565b600281905550610f90816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610df990919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b6110508160036111ce90919063ffffffff16565b8073ffffffffffffffffffffffffffffffffffffffff167f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f660405160405180910390a250565b6110aa8160036112a990919063ffffffff16565b8073ffffffffffffffffffffffffffffffffffffffff167fe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb6669260405160405180910390a250565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611177576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806113fd6022913960400191505060405180910390fd5b8260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6111d882826110f0565b1561124b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f526f6c65733a206163636f756e7420616c72656164792068617320726f6c650081525060200191505060405180910390fd5b60018260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b6112b382826110f0565b611308576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260218152602001806113dc6021913960400191505060405180910390fd5b60008260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f20616464726573734d696e746572526f6c653a2063616c6c657220646f6573206e6f74206861766520746865204d696e74657220726f6c65526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c65526f6c65733a206163636f756e7420697320746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f2061646472657373a165627a7a7230582052a235220ee96077bad0594a753ad279232aae85cf2aacdd1d2ea9f2be16988c0029526f6c65733a206163636f756e7420697320746865207a65726f2061646472657373",
  "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100b45760003560e01c8063983b2d5611610071578063983b2d56146102e7578063986502751461032b578063a457c2d714610335578063a9059cbb1461039b578063aa271e1a14610401578063dd62ed3e1461045d576100b4565b8063095ea7b3146100b957806318160ddd1461011f57806323b872dd1461013d57806339509351146101c357806340c10f191461022957806370a082311461028f575b600080fd5b610105600480360360408110156100cf57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506104d5565b604051808215151515815260200191505060405180910390f35b6101276104ec565b6040518082815260200191505060405180910390f35b6101a96004803603606081101561015357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506104f6565b604051808215151515815260200191505060405180910390f35b61020f600480360360408110156101d957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506105a7565b604051808215151515815260200191505060405180910390f35b6102756004803603604081101561023f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061064c565b604051808215151515815260200191505060405180910390f35b6102d1600480360360208110156102a557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506106c0565b6040518082815260200191505060405180910390f35b610329600480360360208110156102fd57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610708565b005b610333610772565b005b6103816004803603604081101561034b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061077d565b604051808215151515815260200191505060405180910390f35b6103e7600480360360408110156103b157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610822565b604051808215151515815260200191505060405180910390f35b6104436004803603602081101561041757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610839565b604051808215151515815260200191505060405180910390f35b6104bf6004803603604081101561047357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610856565b6040518082815260200191505060405180910390f35b60006104e23384846108dd565b6001905092915050565b6000600254905090565b6000610503848484610ad4565b61059c843361059785600160008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610d7090919063ffffffff16565b6108dd565b600190509392505050565b6000610642338461063d85600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610df990919063ffffffff16565b6108dd565b6001905092915050565b600061065733610839565b6106ac576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260308152602001806113ac6030913960400191505060405180910390fd5b6106b68383610e81565b6001905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b61071133610839565b610766576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260308152602001806113ac6030913960400191505060405180910390fd5b61076f8161103c565b50565b61077b33611096565b565b6000610818338461081385600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610d7090919063ffffffff16565b6108dd565b6001905092915050565b600061082f338484610ad4565b6001905092915050565b600061084f8260036110f090919063ffffffff16565b9050919050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610963576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806114446024913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156109e9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602281526020018061138a6022913960400191505060405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040518082815260200191505060405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610b5a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602581526020018061141f6025913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610be0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001806113676023913960400191505060405180910390fd5b610c31816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610d7090919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610cc4816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610df990919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b600082821115610de8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525060200191505060405180910390fd5b600082840390508091505092915050565b600080828401905083811015610e77576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610f24576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f45524332303a206d696e7420746f20746865207a65726f20616464726573730081525060200191505060405180910390fd5b610f3981600254610df990919063ffffffff16565b600281905550610f90816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610df990919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b6110508160036111ce90919063ffffffff16565b8073ffffffffffffffffffffffffffffffffffffffff167f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f660405160405180910390a250565b6110aa8160036112a990919063ffffffff16565b8073ffffffffffffffffffffffffffffffffffffffff167fe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb6669260405160405180910390a250565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611177576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806113fd6022913960400191505060405180910390fd5b8260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6111d882826110f0565b1561124b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f526f6c65733a206163636f756e7420616c72656164792068617320726f6c650081525060200191505060405180910390fd5b60018260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b6112b382826110f0565b611308576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260218152602001806113dc6021913960400191505060405180910390fd5b60008260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f20616464726573734d696e746572526f6c653a2063616c6c657220646f6573206e6f74206861766520746865204d696e74657220726f6c65526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c65526f6c65733a206163636f756e7420697320746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f2061646472657373a165627a7a7230582052a235220ee96077bad0594a753ad279232aae85cf2aacdd1d2ea9f2be16988c0029",
  "sourceMap": "322:322:108:-;;;275:22:2;286:10;275;;;:22;;:::i;:::-;322:322:108;;737:119:2;793:21;806:7;793:8;:12;;;;;;:21;;;;:::i;:::-;841:7;829:20;;;;;;;;;;;;737:119;:::o;260:175:0:-;337:18;341:4;347:7;337:3;;;:18;;:::i;:::-;336:19;328:63;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;424:4;401;:11;;:20;413:7;401:20;;;;;;;;;;;;;;;;:27;;;;;;;;;;;;;;;;;;260:175;;:::o;779:200::-;851:4;894:1;875:21;;:7;:21;;;;867:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;952:4;:11;;:20;964:7;952:20;;;;;;;;;;;;;;;;;;;;;;;;;945:27;;779:200;;;;:::o;322:322:108:-;;;;;;;",
  "deployedSourceMap": "322:322:108:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;322:322:108;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2453:145:104;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;2453:145:104;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;1514:89;;;:::i;:::-;;;;;;;;;;;;;;;;;;;3055:252;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;3055:252:104;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;3702:203;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;3702:203:104;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;502:140:108;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;502:140:108;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;1661:108:104;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;1661:108:104;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;560:90:2;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;560:90:2;;;;;;;;;;;;;;;;;;;:::i;:::-;;656:75;;;:::i;:::-;;4392:213:104;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;4392:213:104;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;1972:153;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;1972:153:104;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;447:107:2;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;447:107:2;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;2183:132:104;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;2183:132:104;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;2453:145;2518:4;2534:36;2543:10;2555:7;2564:5;2534:8;:36::i;:::-;2587:4;2580:11;;2453:145;;;;:::o;1514:89::-;1558:7;1584:12;;1577:19;;1514:89;:::o;3055:252::-;3144:4;3160:36;3170:6;3178:9;3189:6;3160:9;:36::i;:::-;3206:73;3215:6;3223:10;3235:43;3271:6;3235:11;:19;3247:6;3235:19;;;;;;;;;;;;;;;:31;3255:10;3235:31;;;;;;;;;;;;;;;;:35;;:43;;;;:::i;:::-;3206:8;:73::i;:::-;3296:4;3289:11;;3055:252;;;;;:::o;3702:203::-;3782:4;3798:79;3807:10;3819:7;3828:48;3865:10;3828:11;:23;3840:10;3828:23;;;;;;;;;;;;;;;:32;3852:7;3828:32;;;;;;;;;;;;;;;;:36;;:48;;;;:::i;:::-;3798:8;:79::i;:::-;3894:4;3887:11;;3702:203;;;;:::o;502:140:108:-;576:4;350:20:2;359:10;350:8;:20::i;:::-;342:81;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;592:22:108;598:7;607:6;592:5;:22::i;:::-;631:4;624:11;;502:140;;;;:::o;1661:108:104:-;1718:7;1744:9;:18;1754:7;1744:18;;;;;;;;;;;;;;;;1737:25;;1661:108;;;:::o;560:90:2:-;350:20;359:10;350:8;:20::i;:::-;342:81;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;624:19;635:7;624:10;:19::i;:::-;560:90;:::o;656:75::-;699:25;713:10;699:13;:25::i;:::-;656:75::o;4392:213:104:-;4477:4;4493:84;4502:10;4514:7;4523:53;4560:15;4523:11;:23;4535:10;4523:23;;;;;;;;;;;;;;;:32;4547:7;4523:32;;;;;;;;;;;;;;;;:36;;:53;;;;:::i;:::-;4493:8;:84::i;:::-;4594:4;4587:11;;4392:213;;;;:::o;1972:153::-;2041:4;2057:40;2067:10;2079:9;2090:6;2057:9;:40::i;:::-;2114:4;2107:11;;1972:153;;;;:::o;447:107:2:-;503:4;526:21;539:7;526:8;:12;;:21;;;;:::i;:::-;519:28;;447:107;;;:::o;2183:132:104:-;2255:7;2281:11;:18;2293:5;2281:18;;;;;;;;;;;;;;;:27;2300:7;2281:27;;;;;;;;;;;;;;;;2274:34;;2183:132;;;;:::o;7117:329::-;7226:1;7209:19;;:5;:19;;;;7201:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;7306:1;7287:21;;:7;:21;;;;7279:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;7388:5;7358:11;:18;7370:5;7358:18;;;;;;;;;;;;;;;:27;7377:7;7358:27;;;;;;;;;;;;;;;:35;;;;7424:7;7408:31;;7417:5;7408:31;;;7433:5;7408:31;;;;;;;;;;;;;;;;;;7117:329;;;:::o;5079:422::-;5194:1;5176:20;;:6;:20;;;;5168:70;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5277:1;5256:23;;:9;:23;;;;5248:71;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5350:29;5372:6;5350:9;:17;5360:6;5350:17;;;;;;;;;;;;;;;;:21;;:29;;;;:::i;:::-;5330:9;:17;5340:6;5330:17;;;;;;;;;;;;;;;:49;;;;5412:32;5437:6;5412:9;:20;5422:9;5412:20;;;;;;;;;;;;;;;;:24;;:32;;;;:::i;:::-;5389:9;:20;5399:9;5389:20;;;;;;;;;;;;;;;:55;;;;5476:9;5459:35;;5468:6;5459:35;;;5487:6;5459:35;;;;;;;;;;;;;;;;;;5079:422;;;:::o;1274:179:39:-;1332:7;1364:1;1359;:6;;1351:49;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1410:9;1426:1;1422;:5;1410:17;;1445:1;1438:8;;;1274:179;;;;:::o;834:176::-;892:7;911:9;927:1;923;:5;911:17;;951:1;946;:6;;938:46;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1002:1;995:8;;;834:176;;;;:::o;5771:302:104:-;5865:1;5846:21;;:7;:21;;;;5838:65;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5929:24;5946:6;5929:12;;:16;;:24;;;;:::i;:::-;5914:12;:39;;;;5984:30;6007:6;5984:9;:18;5994:7;5984:18;;;;;;;;;;;;;;;;:22;;:30;;;;:::i;:::-;5963:9;:18;5973:7;5963:18;;;;;;;;;;;;;;;:51;;;;6050:7;6029:37;;6046:1;6029:37;;;6059:6;6029:37;;;;;;;;;;;;;;;;;;5771:302;;:::o;737:119:2:-;793:21;806:7;793:8;:12;;:21;;;;:::i;:::-;841:7;829:20;;;;;;;;;;;;737:119;:::o;862:127::-;921:24;937:7;921:8;:15;;:24;;;;:::i;:::-;974:7;960:22;;;;;;;;;;;;862:127;:::o;779:200:0:-;851:4;894:1;875:21;;:7;:21;;;;867:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;952:4;:11;;:20;964:7;952:20;;;;;;;;;;;;;;;;;;;;;;;;;945:27;;779:200;;;;:::o;260:175::-;337:18;341:4;347:7;337:3;:18::i;:::-;336:19;328:63;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;424:4;401;:11;;:20;413:7;401:20;;;;;;;;;;;;;;;;:27;;;;;;;;;;;;;;;;;;260:175;;:::o;510:180::-;589:18;593:4;599:7;589:3;:18::i;:::-;581:64;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;678:5;655:4;:11;;:20;667:7;655:20;;;;;;;;;;;;;;;;:28;;;;;;;;;;;;;;;;;;510:180;;:::o",
  "source": "pragma solidity ^0.5.0;\n\nimport \"./ERC20.sol\";\nimport \"../../access/roles/MinterRole.sol\";\n\n/**\n * @dev Extension of `ERC20` that adds a set of accounts with the `MinterRole`,\n * which have permission to mint (create) new tokens as they see fit.\n *\n * At construction, the deployer of the contract is the only minter.\n */\ncontract ERC20Mintable is ERC20, MinterRole {\n    /**\n     * @dev See `ERC20._mint`.\n     *\n     * Requirements:\n     *\n     * - the caller must have the `MinterRole`.\n     */\n    function mint(address account, uint256 amount) public onlyMinter returns (bool) {\n        _mint(account, amount);\n        return true;\n    }\n}\n",
  "sourcePath": "/home/nventuro/dev/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol",
  "ast": {
    "absolutePath": "/home/nventuro/dev/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol",
    "exportedSymbols": {
      "ERC20Mintable": [8356]
    },
    "id": 8357,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 8330,
        "literals": ["solidity", "^", "0.5", ".0"],
        "nodeType": "PragmaDirective",
        "src": "0:23:108"
      },
      {
        "absolutePath": "/home/nventuro/dev/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol",
        "file": "./ERC20.sol",
        "id": 8331,
        "nodeType": "ImportDirective",
        "scope": 8357,
        "sourceUnit": 8181,
        "src": "25:21:108",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/home/nventuro/dev/openzeppelin-solidity/contracts/access/roles/MinterRole.sol",
        "file": "../../access/roles/MinterRole.sol",
        "id": 8332,
        "nodeType": "ImportDirective",
        "scope": 8357,
        "sourceUnit": 289,
        "src": "47:43:108",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 8333,
              "name": "ERC20",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 8180,
              "src": "348:5:108",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20_$8180",
                "typeString": "contract ERC20"
              }
            },
            "id": 8334,
            "nodeType": "InheritanceSpecifier",
            "src": "348:5:108"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 8335,
              "name": "MinterRole",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 288,
              "src": "355:10:108",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_MinterRole_$288",
                "typeString": "contract MinterRole"
              }
            },
            "id": 8336,
            "nodeType": "InheritanceSpecifier",
            "src": "355:10:108"
          }
        ],
        "contractDependencies": [288, 8180, 8527],
        "contractKind": "contract",
        "documentation": "@dev Extension of `ERC20` that adds a set of accounts with the `MinterRole`,\nwhich have permission to mint (create) new tokens as they see fit.\n * At construction, the deployer of the contract is the only minter.",
        "fullyImplemented": true,
        "id": 8356,
        "linearizedBaseContracts": [8356, 288, 8180, 8527],
        "name": "ERC20Mintable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 8354,
              "nodeType": "Block",
              "src": "582:60:108",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 8348,
                        "name": "account",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8338,
                        "src": "598:7:108",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 8349,
                        "name": "amount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8340,
                        "src": "607:6:108",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 8347,
                      "name": "_mint",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8066,
                      "src": "592:5:108",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256)"
                      }
                    },
                    "id": 8350,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "592:22:108",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 8351,
                  "nodeType": "ExpressionStatement",
                  "src": "592:22:108"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 8352,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "631:4:108",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 8346,
                  "id": 8353,
                  "nodeType": "Return",
                  "src": "624:11:108"
                }
              ]
            },
            "documentation": "@dev See `ERC20._mint`.\n     * Requirements:\n     * - the caller must have the `MinterRole`.",
            "id": 8355,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": null,
                "id": 8343,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 8342,
                  "name": "onlyMinter",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 221,
                  "src": "556:10:108",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "556:10:108"
              }
            ],
            "name": "mint",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 8341,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8338,
                  "name": "account",
                  "nodeType": "VariableDeclaration",
                  "scope": 8355,
                  "src": "516:15:108",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 8337,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "516:7:108",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 8340,
                  "name": "amount",
                  "nodeType": "VariableDeclaration",
                  "scope": 8355,
                  "src": "533:14:108",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 8339,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "533:7:108",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "515:33:108"
            },
            "returnParameters": {
              "id": 8346,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8345,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 8355,
                  "src": "576:4:108",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 8344,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "576:4:108",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "575:6:108"
            },
            "scope": 8356,
            "src": "502:140:108",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 8357,
        "src": "322:322:108"
      }
    ],
    "src": "0:645:108"
  },
  "legacyAST": {
    "absolutePath": "/home/nventuro/dev/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol",
    "exportedSymbols": {
      "ERC20Mintable": [8356]
    },
    "id": 8357,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 8330,
        "literals": ["solidity", "^", "0.5", ".0"],
        "nodeType": "PragmaDirective",
        "src": "0:23:108"
      },
      {
        "absolutePath": "/home/nventuro/dev/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol",
        "file": "./ERC20.sol",
        "id": 8331,
        "nodeType": "ImportDirective",
        "scope": 8357,
        "sourceUnit": 8181,
        "src": "25:21:108",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/home/nventuro/dev/openzeppelin-solidity/contracts/access/roles/MinterRole.sol",
        "file": "../../access/roles/MinterRole.sol",
        "id": 8332,
        "nodeType": "ImportDirective",
        "scope": 8357,
        "sourceUnit": 289,
        "src": "47:43:108",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 8333,
              "name": "ERC20",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 8180,
              "src": "348:5:108",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20_$8180",
                "typeString": "contract ERC20"
              }
            },
            "id": 8334,
            "nodeType": "InheritanceSpecifier",
            "src": "348:5:108"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 8335,
              "name": "MinterRole",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 288,
              "src": "355:10:108",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_MinterRole_$288",
                "typeString": "contract MinterRole"
              }
            },
            "id": 8336,
            "nodeType": "InheritanceSpecifier",
            "src": "355:10:108"
          }
        ],
        "contractDependencies": [288, 8180, 8527],
        "contractKind": "contract",
        "documentation": "@dev Extension of `ERC20` that adds a set of accounts with the `MinterRole`,\nwhich have permission to mint (create) new tokens as they see fit.\n * At construction, the deployer of the contract is the only minter.",
        "fullyImplemented": true,
        "id": 8356,
        "linearizedBaseContracts": [8356, 288, 8180, 8527],
        "name": "ERC20Mintable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 8354,
              "nodeType": "Block",
              "src": "582:60:108",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 8348,
                        "name": "account",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8338,
                        "src": "598:7:108",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 8349,
                        "name": "amount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8340,
                        "src": "607:6:108",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 8347,
                      "name": "_mint",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8066,
                      "src": "592:5:108",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256)"
                      }
                    },
                    "id": 8350,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "592:22:108",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 8351,
                  "nodeType": "ExpressionStatement",
                  "src": "592:22:108"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 8352,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "631:4:108",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 8346,
                  "id": 8353,
                  "nodeType": "Return",
                  "src": "624:11:108"
                }
              ]
            },
            "documentation": "@dev See `ERC20._mint`.\n     * Requirements:\n     * - the caller must have the `MinterRole`.",
            "id": 8355,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": null,
                "id": 8343,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 8342,
                  "name": "onlyMinter",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 221,
                  "src": "556:10:108",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "556:10:108"
              }
            ],
            "name": "mint",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 8341,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8338,
                  "name": "account",
                  "nodeType": "VariableDeclaration",
                  "scope": 8355,
                  "src": "516:15:108",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 8337,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "516:7:108",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 8340,
                  "name": "amount",
                  "nodeType": "VariableDeclaration",
                  "scope": 8355,
                  "src": "533:14:108",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 8339,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "533:7:108",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "515:33:108"
            },
            "returnParameters": {
              "id": 8346,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8345,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 8355,
                  "src": "576:4:108",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 8344,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "576:4:108",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "575:6:108"
            },
            "scope": 8356,
            "src": "502:140:108",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 8357,
        "src": "322:322:108"
      }
    ],
    "src": "0:645:108"
  },
  "compiler": {
    "name": "solc",
    "version": "0.5.7+commit.6da8b019.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "3.0.9",
  "updatedAt": "2019-05-27T15:17:50.242Z",
  "devdoc": {
    "details": "Extension of `ERC20` that adds a set of accounts with the `MinterRole`, which have permission to mint (create) new tokens as they see fit. * At construction, the deployer of the contract is the only minter.",
    "methods": {
      "allowance(address,address)": {
        "details": "See `IERC20.allowance`."
      },
      "approve(address,uint256)": {
        "details": "See `IERC20.approve`.     * Requirements:     * - `spender` cannot be the zero address."
      },
      "balanceOf(address)": {
        "details": "See `IERC20.balanceOf`."
      },
      "decreaseAllowance(address,uint256)": {
        "details": "Atomically decreases the allowance granted to `spender` by the caller.     * This is an alternative to `approve` that can be used as a mitigation for problems described in `IERC20.approve`.     * Emits an `Approval` event indicating the updated allowance.     * Requirements:     * - `spender` cannot be the zero address. - `spender` must have allowance for the caller of at least `subtractedValue`."
      },
      "increaseAllowance(address,uint256)": {
        "details": "Atomically increases the allowance granted to `spender` by the caller.     * This is an alternative to `approve` that can be used as a mitigation for problems described in `IERC20.approve`.     * Emits an `Approval` event indicating the updated allowance.     * Requirements:     * - `spender` cannot be the zero address."
      },
      "mint(address,uint256)": {
        "details": "See `ERC20._mint`.     * Requirements:     * - the caller must have the `MinterRole`."
      },
      "totalSupply()": {
        "details": "See `IERC20.totalSupply`."
      },
      "transfer(address,uint256)": {
        "details": "See `IERC20.transfer`.     * Requirements:     * - `recipient` cannot be the zero address. - the caller must have a balance of at least `amount`."
      },
      "transferFrom(address,address,uint256)": {
        "details": "See `IERC20.transferFrom`.     * Emits an `Approval` event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of `ERC20`;     * Requirements: - `sender` and `recipient` cannot be the zero address. - `sender` must have a balance of at least `value`. - the caller must have allowance for `sender`'s tokens of at least `amount`."
      }
    }
  },
  "userdoc": {
    "methods": {}
  }
}
