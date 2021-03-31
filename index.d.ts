// Type definitions for icon-sdk-js 0.0.18
// Project: https://github.com/icon-project/icon-sdk-js/
// Definitions by: Ben Booth <https://github.com/bkbooth>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import BigNumber from "bignumber.js";

type Key = string | Buffer | ArrayBuffer | Array<any>;

interface KeyValue {
    [key: string]: any;
}

declare class HttpCall {
    // TODO
    execute(): Promise<any>;
}

/**
 * Class for calling the SCORE API.
 */
declare class Call {
    /**
     * Creates an instance of Call.
     *
     * @param to The SCORE address.
     * @param from The EOA address.
     * @param data
     */
    constructor(to: string, from: string, data: KeyValue);
}

/**
 * Super class representing a transaction object for sending transaction.
 */
declare class IcxTransaction {
    /**
     * Creates an instance of IcxTransaction.
     *
     * @param to The EOA or SCORE address.
     * @param from The EOA address.
     * @param value The sending amount of ICX in loop unit.
     * @param stepLimit The step limit.
     * @param nid The nid (network ID)
     * @param nonce The nonce.
     * @param version The network version.
     * @param timestamp The timestamp.
     */
    constructor(
        to: string,
        from: string,
        value: BigNumber.Value,
        stepLimit: BigNumber.Value,
        nid: BigNumber.Value,
        nonce: BigNumber.Value,
        version: BigNumber.Value,
        timestamp: BigNumber.Value,
    );
}

/**
 * SubClass for making the transaction object for calling a method in SCORE.
 */
declare class CallTransaction extends IcxTransaction {
    /**
     * Creates an instance of CallTransaction.
     *
     * @param to The EOA or SCORE address.
     * @param from The EOA address.
     * @param value The sending amount of ICX in loop unit.
     * @param stepLimit The step limit.
     * @param nid The nid (network ID)
     * @param nonce The nonce.
     * @param version The network version.
     * @param timestamp The timestamp.
     * @param method The method name of SCORE API.
     * @param params The input params for method.
     */
    constructor(
        to: string,
        from: string,
        value: BigNumber.Value,
        stepLimit: BigNumber.Value,
        nid: BigNumber.Value,
        nonce: BigNumber.Value,
        version: BigNumber.Value,
        timestamp: BigNumber.Value,
        method: string,
        params: KeyValue,
    );
}

/**
 * Subclass making a transaction object for deploying SCORE.
 */
declare class DeployTransaction extends IcxTransaction {
    /**
     * Creates an instance of DeployTransaction.
     *
     * @param to The EOA or SCORE address.
     * @param from The EOA address.
     * @param value The sending amount of ICX in loop unit.
     * @param stepLimit The step limit.
     * @param nid The nid (network ID)
     * @param nonce The nonce.
     * @param version The network version.
     * @param timestamp The timestamp.
     * @param contentType The content type of content.
     * @param content The content to deploy.
     * @param params The input params for deploying content.
     */
    constructor(
        to: string,
        from: string,
        value: BigNumber.Value,
        stepLimit: BigNumber.Value,
        nid: BigNumber.Value,
        nonce: BigNumber.Value,
        version: BigNumber.Value,
        timestamp: BigNumber.Value,
        contentType: string,
        content: string,
        params: KeyValue,
    );
}

/**
 * Subclass for making a transaction object for sending a message.
 */
declare class MessageTransaction extends IcxTransaction {
    /**
     * Creates an instance of MessageTransaction.
     *
     * @param to The EOA or SCORE address.
     * @param from The EOA address.
     * @param value The sending amount of ICX in loop unit.
     * @param stepLimit The step limit.
     * @param nid The nid (network ID)
     * @param nonce The nonce.
     * @param version The network version.
     * @param timestamp The timestamp.
     * @param data The data to send.
     */
    constructor(
        to: string,
        from: string,
        value: BigNumber.Value,
        stepLimit: BigNumber.Value,
        nid: BigNumber.Value,
        nonce: BigNumber.Value,
        version: BigNumber.Value,
        timestamp: BigNumber.Value,
        data: string,
    );
}

/**
 * Class which provides APIs of ICON network.
 */
export default class IconService {
    /**
     * Creates an instance of IconService.
     *
     * @param provider The HttpProvider instance.
     */
    constructor(provider: HttpProvider);

    /**
     * Get the total number of issued coins.
     *
     * @returns The HttpCall instance for icx_getTotalSupply JSON-RPC API request.
     */
    getTotalSupply(): HttpCall;

    /**
     * Get the balance of the address.
     *
     * @param address The EOA or SCORE address.
     *
     * @returns The HttpCall instance for icx_getBalance JSON-RPC API request.
     */
    getBalance(address: string): HttpCall;

    /**
     * Get the block information.
     *
     * @param value The height or hash value of block.
     *
     * @returns The HttpCall instance for icx_getBlockByHeight, icx_getBlockByHash or icx_getLastBlock JSON-RPC API request.
     */
    getBlock(value: string | BigNumber): HttpCall;

    /**
     * Get the block information.
     *
     * @param value The value of block number
     *
     * @returns The Block object
     */
    getBlockByHeight(value: BigNumber): HttpCall;

    /**
     * Get the block information.
     *
     * @param value The value of block hash
     *
     * @returns The Block object
     */
    getBlockByHash(value: string): HttpCall;

    /**
     * Get the last block information.
     *
     * @returns The Block object
     */
    getLastBlock(): HttpCall;

    /**
     * Get the SCORE API list.
     *
     * @param address SCORE address
     *
     * @returns The list of SCORE API
     */
    getScoreApi(address: string): HttpCall;

    /**
     * Get the transaction information.
     *
     * @param hash The transaction hash.
     *
     * @returns The HttpCall instance for icx_getTransactionByHash JSON-RPC API request.
     */
    getTransaction(hash: string): HttpCall;

    /**
     * Get the result of transaction by transaction hash.
     *
     * @param hash The transaction hash.
     *
     * @returns The HttpCall instance for icx_getTransactionResult JSON-RPC API request.
     */
    getTransactionResult(hash: string): HttpCall;

    /**
     * Send a transaction that changes the states of address.
     *
     * @param signedTransaction Parameters including signature.
     *
     * @returns The HttpCall instance for icx_sendTransaction JSON-RPC API request.
     */
    sendTransaction(signedTransaction: SignedTransaction): HttpCall;

    /**
     * Calls a SCORE API just for reading.
     *
     * @param call The call instance exported by CallBuilder
     *
     * @returns The HttpCall instance for icx_call JSON-RPC API request.
     */
    call(call: Call): HttpCall;
}

/**
 * Class which provides unit conversion functions.
 */
export class IconAmount {
    public value: BigNumber;
    public digit: number;

    /**
     * Creates an instance of IconAmount.
     *
     * Note: According to official document of BigNumber.js,
     * it is recommended to create BigNumbers from String values rather than Number values
     * to avoid a potential loss of precision.
     *
     * @param value the value of amount.
     * @param digit the digit of unit.
     */
    constructor(value: BigNumber.Value, digit: BigNumber.Value);

    /**
     * Creates an instance of IconAmount.
     *
     * @param value the value of amount.
     * @param digit the digit of unit.
     *
     * @returns the IconAmount instance.
     */
    static of(value: BigNumber.Value, digit: BigNumber.Value): IconAmount;

    /**
     * Get digit property.
     *
     * @returns the digit property of IconAmount instance.
     */
    getDigit(): number;

    /**
     * Convert value property into string
     *
     * @returns the stringified value property of IconAmount instance
     */
    toString(): string;

    /**
     * Convert the unit of value property into loop
     *
     * @returns the value property converted into loop
     */
    toLoop(): BigNumber;

    /**
     * Convert the unit of value property into custom digit
     *
     * @param digit the digit of unit.
     *
     * @returns the IconAmount instance converted into custom digit
     */
    convertUnit(digit: BigNumber.Value): IconAmount;

    /**
     * IconAmount class property which contains unit digit constants
     */
    static Unit: { LOOP: 0; GLOOP: 9; ICX: 18 };
}

export namespace IconBuilder {
    /**
     * Builder class for a 'Call' object.
     */
    class CallBuilder {
        /**
         * Creates an instance of CallBuilder.
         */
        constructor();

        /**
         * Set 'to' property
         *
         * @param to The SCORE address.
         */
        to(to: string): this;

        /**
         * Set 'from' property
         *
         * @param from The EOA address.
         */
        from(from: string): this;

        /**
         * Set 'method' property
         *
         * @param method The method name of SCORE API
         */
        method(method: string): this;

        /**
         * Set 'params' property
         *
         * @param params The input params for method
         */
        params(params: KeyValue): this;

        /**
         * Build 'Call' object
         *
         * @returns 'Call' instance exported by 'CallBuilder'.
         */
        build(): Call;
    }

    /**
     * Builder for 'IcxTransaction' object.
     */
    class IcxTransactionBuilder {
        /**
         * Creates an instance of IcxTransactionBuilder.
         */
        constructor();

        /**
         * Set 'to' property
         *
         * @param to The EOA or SCORE address.
         */
        to(to: string): this;

        /**
         * Set 'from' property
         *
         * @param from The EOA address.
         */
        from(from: string): this;

        /**
         * Set 'value' property
         *
         * @param value The sending amount of ICX in loop unit.
         */
        value(value: BigNumber.Value): this;

        /**
         * Set 'stepLimit' property
         *
         * @param stepLimit The step limit.
         */
        stepLimit(stepLimit: BigNumber.Value): this;

        /**
         * Set 'nid' property
         *
         * @param nid The nid (network ID)
         */
        nid(nid: BigNumber.Value): this;

        /**
         * Set 'nonce' property
         *
         * @param nonce The nonce.
         */
        nonce(nonce: BigNumber.Value): this;

        /**
         * Set 'version' property
         *
         * @param version The network version.
         */
        version(version: BigNumber.Value): this;

        /**
         * Set 'timestamp' property
         *
         * @param timestamp The timestamp.
         */
        timestamp(timestamp: BigNumber.Value): this;

        /**
         * Build 'IcxTransaction' object
         *
         * @returns 'IcxTransaction' instance exported by 'IcxTransactionBuilder'.
         */
        build(): IcxTransaction;
    }

    /**
     * Builder for 'CallTransaction' object.
     */
    class CallTransactionBuilder extends IcxTransactionBuilder {
        /**
         * Creates an instance of CallTransactionBuilder.
         */
        constructor();

        /**
         * Set 'method' property
         *
         * @param method The method name of SCORE API.
         */
        method(method: string): this;

        /**
         * Set 'params' property
         *
         * @param params The input params for method.
         */
        params(params: KeyValue): this;

        /**
         * Build 'CallTransaction' object
         *
         * @returns 'CallTransaction' instance exported by 'CallTransactionBuilder'.
         */
        build(): CallTransaction;
    }

    /**
     * Builder for 'DeployTransaction' object.
     */
    class DeployTransactionBuilder extends IcxTransactionBuilder {
        /**
         * Creates an instance of DeployTransactionBuilder.
         */
        constructor();

        /**
         * Set 'contentType' property
         *
         * @param contentType The content type of content.
         */
        contentType(contentType: string): this;

        /**
         * Set 'content' property
         *
         * @param content The content to deploy.
         */
        content(content: string): this;

        /**
         * Set 'params' property
         *
         * @param params The input params for deploying content.
         */
        params(params: KeyValue): this;

        /**
         * Build 'DeployTransaction' object
         *
         * @returns 'DeployTransaction' instance exported by 'DeployTransactionBuilder'
         */
        build(): DeployTransaction;
    }

    /**
     * Builder for 'MessageTransaction' object.
     */
    class MessageTransactionBuilder extends IcxTransactionBuilder {
        /**
         * Creates an instance of MessageTransactionBuilder.
         */
        constructor();

        /**
         * Set 'data' property
         *
         * @param data The data to send.
         */
        data(data: string): this;

        /**
         * Build 'MessageTransaction' object
         *
         * @returns 'MessageTransaction' instance exported by 'MessageTransactionBuilder'
         */
        build(): MessageTransaction;
    }
}

export namespace IconConverter {
    /**
     * Convert UTF-8 text to hex string.
     *
     * @param value the UTF-8 string only.
     *
     * @returns the hex string.
     */
    function fromUtf8(value: string): string;

    /**
     * Convert hex string to UTF-8 text.
     *
     * @param value the hex string only.
     *
     * @returns the UTF-8 string.
     */
    function toUtf8(value: string): string;

    /**
     * Convert string or BigNumber value to number.
     *
     * @param value the value.
     *
     * @returns the value converted to number.
     */
    function toNumber(value: BigNumber.Value): number;

    /**
     * Convert string or number value to BigNumber.
     *
     * @param value the value.
     *
     * @returns the value converted to BigNumber.
     */
    function toBigNumber(value: BigNumber.Value): BigNumber;

    /**
     * Convert string, number or BigNumber value to hex string strictly.
     *
     * @param value the value that represents the number.
     *
     * @returns the value converted to hex string.
     */
    function toHexNumber(value: BigNumber.Value): string;

    /**
     * Convert string, number or BigNumber value to hex string.
     *
     * @param value the value.
     *
     * @returns the value converted to hex string.
     */
    function toHex(value: BigNumber.Value): string;

    /**
     * Convert transaction object to raw transaction object.
     *
     * @param transaction the transaction object.
     *
     * @returns the raw transaction object.
     */
    function toRawTransaction(
        transaction: IcxTransaction | CallTransaction | DeployTransaction | MessageTransaction,
    ): KeyValue;
}

/**
 * Class which provides EOA functions.
 */
export class IconWallet {
    /**
     * Creates an instance of Wallet.
     *
     * @param privateKey The private key.
     * @param publicKey The public key.
     */
    constructor(privateKey: Key, publicKey?: null | undefined);
    constructor(privateKey: null | undefined, publicKey: Key);

    /**
     * Creates an instance of Wallet.
     *
     * @returns The wallet instance.
     */
    static create(): IconWallet;

    /**
     * Import existing wallet instance using private key.
     *
     * @param privateKey The private key.
     *
     * @returns The wallet instance.
     */
    static loadPrivateKey(privateKey: Key): IconWallet;

    /**
     * Import existing wallet instance using keystore object.
     *
     * @param keystore The keystore object or stringified object.
     * @param password The password of keystore object.
     * @param nonStrict Set whether checking keystore file case-insensitive or not. (affects when 'keystore' param is string.)
     *
     * @returns The wallet instance.
     */
    static loadKeystore(keystore: KeyValue | string, password: string, nonStrict?: boolean): IconWallet;

    /**
     * Get keystore object of an instance of a `Wallet` class.
     *
     * @param password The new password for encryption.
     * @param options The custom options for encryption.
     *
     * @returns A keystore object.
     */
    store(password: string, options?: KeyValue): KeyValue;

    /**
     * Generate signature string by signing transaction object.
     *
     * @param data The serialized transaction object.
     *
     * @returns The signature string.
     */
    sign(data: Buffer): string;

    /**
     * Get private key of wallet instance.
     *
     * @returns The private key.
     */
    getPrivateKey(): string;

    /**
     * Get public key of wallet instance.
     *
     * @returns The public key.
     */
    getPublicKey(): string;

    /**
     * Get EOA address of wallet instance.
     *
     * @returns The EOA address.
     */
    getAddress(): string;
}

export namespace IconValidator {
    /**
     * Check if input value is a private key.
     *
     * @param value the input value.
     *
     * @returns returns true if the input value is a private key.
     */
    function isPrivateKey(value: Key): boolean;

    /**
     * Check if input value is a public key.
     *
     * @param value the input value.
     *
     * @returns returns true if the input value is a public key.
     */
    function isPublicKey(value: Key): boolean;

    /**
     * Check if input value is a EOA address.
     *
     * @param address the input value.
     *
     * @returns returns true if the input value is a EOA address.
     */
    function isEoaAddress(value: any): boolean;

    /**
     * Check if input value is a SCORE address.
     *
     * @param address the input value.
     *
     * @returns returns true if the input value is a SCORE address.
     */
    function isScoreAddress(value: any): boolean;

    /**
     * Check if input value is a EOA or SCORE address.
     *
     * @param address the input value.
     *
     * @returns returns true if the input value is a EOA or SCORE address.
     */
    function isAddress(value: any): boolean;
}

/**
 * Class representing HTTP-based provider
 */
export class HttpProvider {
    /**
     * Creates an instance of HttpProvider.
     *
     * @param url The url of http provider.
     */
    constructor(url: string);

    // TODO
    request(value: KeyValue, converter: any): HttpCall;
}

/**
 * Class representing the signed transaction object.
 */
export class SignedTransaction {
    /**
     * Creates an instance of SignedTransaction.
     *
     * @param transaction The transaction instance.
     * @param wallet The wallet instance.
     */
    constructor(
        transaction: IcxTransaction | CallTransaction | DeployTransaction | MessageTransaction,
        wallet: IconWallet,
    );

    /**
     * Get raw transaction object of this.transaction.
     *
     * @returns The raw transaction object.
     */
    getRawTransaction(): KeyValue;

    /**
     * Get signature string.
     *
     * @returns The signature string.
     */
    getSignature(): string;

    /**
     * Get properties of signed transaction object
     *
     * @returns The signed transaction object.
     */
    getProperties(): KeyValue;
}
