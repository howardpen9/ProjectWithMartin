import "@stdlib/deploy";

message Add {
    amount: Int as uint32;
}

contract MainContract with Deployable {
    const minTonsForStorage: Int = ton("0.03");
    const gasConsumption: Int = ton("0.03");
    owner: Address;
    round_id: Int as uint32;

    init(owner: Address) {
        self.owner = owner;
        self.round_id = 0;
    }

    receive("Join") {
        let ctx: Context = context();
        let init: StateInit = initOf Round(self.round_id, myAddress());
        send(SendParameters{
            to: contractAddress(init),
            body: Join{participator: ctx.sender}.toCell(),
            value: self.msgValue(ctx.value),        
            mode: SendIgnoreErrors, 
            code: init.code,             
            data: init.data
        });
    }
    
    fun msgValue(msgValue: Int): Int {
        let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
        let storageFee: Int = self.minTonsForStorage - min(tonBalanceBeforeMsg, self.minTonsForStorage);
        msgValue = msgValue - (storageFee + self.gasConsumption);
        return msgValue;
    }

    receive("New") {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not Owner");

        send(SendParameters{
            to: self.get_round_contract_address(self.round_id),
            body: "New".asComment(),
            value: 0,        
            mode: SendRemainingValue + SendIgnoreErrors 
        });
        self.round_id = self.round_id + 1;
    }

    get fun get_round_contract_address(round_id: Int): Address {
        let init: StateInit = initOf Round(round_id, myAddress());
        return contractAddress(init);
    }

    get fun get_current_data(): ContractData {
        return ContractData {
            round_id: self.round_id,
            current_round_address: self.get_round_contract_address(self.round_id)
        };
    }
}

struct ContractData {
    round_id: Int;
    current_round_address: Address;
}


// ============= Sub Contract ============= //
contract Round {
    const minTonsForStorage: Int = ton("0.03");
    const gasConsumption: Int = ton("0.03");

    source_address: Address;
    round: Int as uint32;
    user_list: map<Address, Int>;
    balance: Int as coins;
    
    init(_round: Int, _contract: Address) {
        self.round = _round;
        self.source_address = _contract;
        self.balance = 0;
    }

    receive(msg: Join){
        let ctx: Context = context();
        require(ctx.sender == self.source_address, "Not from main contract");
        require(self.user_list.get(msg.participator) == null , "Already store");

        let fwdFee: Int = ctx.readForwardFee() + ctx.readForwardFee();  // Gas checks
        let input: Int = self.msgValue(ctx.value) - fwdFee;
        self.user_list.set(msg.participator, input);
        self.balance = self.balance + input;
    }

    receive("New") {
        let ctx: Context = context();
        require(ctx.sender == self.source_address, "Not from main contract");
        send(SendParameters {to: self.source_address, value: 0, mode: SendIgnoreErrors + SendRemainingBalance, bounce: false});
    }

    get fun get_user_record(): map<Address, Int> { 
        return self.user_list;
    }

    get fun balance_reward(): Int {
        return self.balance;
    }

    fun msgValue(msgValue: Int): Int {
        let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
        let storageFee: Int = self.minTonsForStorage - min(tonBalanceBeforeMsg, self.minTonsForStorage);
        msgValue = msgValue - (storageFee + self.gasConsumption);
        return msgValue;
    }
}

message Join {
    participator: Address;
}

