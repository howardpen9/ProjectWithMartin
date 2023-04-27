import { MainContract } from "./output/sample_MainContract";
import { Round } from "./output/sample_Round";

import { beginCell, Address, contractAddress, ContractProvider, TonClient4, TonClient, fromNano } from "ton";


let owner = Address.parse('kQBqrnY7iluRaskrw-lMZDJ6y7uUkaNmnW7_pNdBA352sTOX');

(async () => {

    // //create client for testnet sandboxv4 API - alternative endpoint
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com",
    });

    let init = await MainContract.init(owner);
    let address = contractAddress(0, init);
    let data = init.data.toBoc();

    let contract_dataFormat = MainContract.fromAddress(address);
    let contract = client.open(contract_dataFormat);

    let current_round_address = (await contract.getGetCurrentData()).current_round_address;
    let nft_item = client.open(Round.fromAddress(current_round_address));

    let user_list = await nft_item.getGetUserRecord();
    if (user_list.size > 0) {
        const keys = user_list.keys();
        const value = user_list.values();
        for (let i = 0; i < keys.length; i++) {
            console.log("User Address: [" + keys[i].toString() + "]: " + fromNano(value[i]).toString(), "💎TON"); 
            // print the address as a string
        }    
    }
})();