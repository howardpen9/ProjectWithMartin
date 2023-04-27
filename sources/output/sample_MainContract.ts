import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Add = {
    $$type: 'Add';
    amount: bigint;
}

export function storeAdd(src: Add) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2278832834, 32);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadAdd(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2278832834) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'Add' as const, amount: _amount };
}

function loadTupleAdd(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Add' as const, amount: _amount };
}

function storeTupleAdd(source: Add) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserAdd(): DictionaryValue<Add> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAdd(src)).endCell());
        },
        parse: (src) => {
            return loadAdd(src.loadRef().beginParse());
        }
    }
}

export type ContractData = {
    $$type: 'ContractData';
    round_id: bigint;
    current_round_address: Address;
}

export function storeContractData(src: ContractData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.round_id, 257);
        b_0.storeAddress(src.current_round_address);
    };
}

export function loadContractData(slice: Slice) {
    let sc_0 = slice;
    let _round_id = sc_0.loadIntBig(257);
    let _current_round_address = sc_0.loadAddress();
    return { $$type: 'ContractData' as const, round_id: _round_id, current_round_address: _current_round_address };
}

function loadTupleContractData(source: TupleReader) {
    let _round_id = source.readBigNumber();
    let _current_round_address = source.readAddress();
    return { $$type: 'ContractData' as const, round_id: _round_id, current_round_address: _current_round_address };
}

function storeTupleContractData(source: ContractData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.round_id);
    builder.writeAddress(source.current_round_address);
    return builder.build();
}

function dictValueParserContractData(): DictionaryValue<ContractData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContractData(src)).endCell());
        },
        parse: (src) => {
            return loadContractData(src.loadRef().beginParse());
        }
    }
}

export type Join = {
    $$type: 'Join';
    participator: Address;
}

export function storeJoin(src: Join) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1719766261, 32);
        b_0.storeAddress(src.participator);
    };
}

export function loadJoin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1719766261) { throw Error('Invalid prefix'); }
    let _participator = sc_0.loadAddress();
    return { $$type: 'Join' as const, participator: _participator };
}

function loadTupleJoin(source: TupleReader) {
    let _participator = source.readAddress();
    return { $$type: 'Join' as const, participator: _participator };
}

function storeTupleJoin(source: Join) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.participator);
    return builder.build();
}

function dictValueParserJoin(): DictionaryValue<Join> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJoin(src)).endCell());
        },
        parse: (src) => {
            return loadJoin(src.loadRef().beginParse());
        }
    }
}

 type MainContract_init_args = {
    $$type: 'MainContract_init_args';
    owner: Address;
}

function initMainContract_init_args(src: MainContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function MainContract_init(owner: Address) {
    const __code = Cell.fromBase64('te6ccgECGwEABLoAART/APSkE/S88sgLAQIBYgIDAtTQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4ILI+EMBzH8BygBZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssfye1UEgQCASAODwKg7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEJRqmLa6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4MAAkTDjDXAFBgE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwMAqj5ASCC8HVRlfs73v1FNyUZhuhb0fvpFQf2yC2eP2f/ype1CL0Euo6GMNs8f9sx4ILwXqxd/KlLlmdZ5MGZ7XTOetjwWNL8Zr5JGxBoloATsTi64wIHCAKi+EFvJDAy+EP4KFJA2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgDFgkDRvhBbyQQI18DIoEOlgLHBfL0INs8iHCAQn8EA21t2zykf9sxFQsMAnbIAYIQZoGM9VjLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJRlTbPBA0AnJAdn8GRVXbPAoMACz4J28QIaGCCcnDgGa2CKGCCcnDgKChAA4AAAAATmV3AcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AA0AmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCAWYQEQIBIBcYAhOzfHbPFjbPGwhgEhUCEbIsNs82zxsIoBITAcDtRNDUAfhj0gABjiX6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMfWWwS4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHR2zwUARpUcQBUFDDbPGwhEhAjFQACcAGQ+EP4KBLbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIFgCoAtD0BDBtAYIA63IBgBD0D2+h8uCHAYIA63IiAoAQ9BfIAcj0AMkBzHABygBAAwKBAQHPAAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJAJW7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnCdl05as07LczoOlm2UZuikgCAUgZGgARsK+7UTQ0gABgAHWybuNDVpcGZzOi8vUW1hMXcxWEFha1NOVU5wd2tKRGpWMXpMNVpxRXNrQW9ES3ZDQk5hRWhXSjRYdoIA==');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMainContract_init_args({ $$type: 'MainContract_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MainContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    3734: { message: `Not Owner` },
    18265: { message: `Already store` },
    55192: { message: `Not from main contract` },
}

export class MainContract implements Contract {
    
    static async init(owner: Address) {
        return await MainContract_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await MainContract_init(owner);
        const address = contractAddress(0, init);
        return new MainContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MainContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: MainContract_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'Join' | 'New' | Deploy) {
        
        let body: Cell | null = null;
        if (message === 'Join') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'New') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetRoundContractAddress(provider: ContractProvider, round_id: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(round_id);
        let source = (await provider.get('get_round_contract_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetCurrentData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_current_data', builder.build())).stack;
        const result = loadTupleContractData(source);
        return result;
    }
    
}