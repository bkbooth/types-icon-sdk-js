// Type definitions for icon-sdk-js 0.0.18
// Project: https://github.com/icon-project/icon-sdk-js/
// Definitions by: Ben Booth <https://github.com/bkbooth>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { BigNumber } from "bignumber.js";

type Key = string | Buffer | ArrayBuffer | Array<any>;

interface KeyValue {
    [key: string]: any;
}

declare class Call {
    constructor(to: string, from: string, data: KeyValue);
}

declare class HttpCall {
    // TODO
    execute(): Promise<any>;
}

export default class IconService {
    /**
     * Creates an instance of IconService.
     */
    constructor(provider: HttpProvider);

    /**
     * Get the balance of the address.
     */
    getBalance(address: string): HttpCall;

    /**
     * Calls a SCORE API just for reading.
     */
    call(call: Call): HttpCall;
}

export class IconAmount {
    public value: BigNumber;
    public digit: number;

    /**
     * Creates an instance of IconAmount.
     *
     * Note: According to official document of BigNumber.js,
     * it is recommended to create BigNumbers from String values rather than Number values
     * to avoid a potential loss of precision.
     */
    constructor(value: BigNumber.Value, digit: BigNumber.Value);

    /**
     * Creates an instance of IconAmount.
     */
    static of(value: BigNumber.Value, digit: BigNumber.Value): IconAmount;

    /**
     * Get digit property.
     */
    getDigit(): number;

    /**
     * Convert value property into string
     */
    toString(): string;

    /**
     * Convert the unit of value property into loop
     */
    toLoop(): BigNumber;

    /**
     * Convert the unit of value property into custom digit
     */
    convertUnit(digit: BigNumber.Value): IconAmount;

    /**
     * IconAmount class property which contains unit digit constants
     */
    static Unit: { LOOP: 0; GLOOP: 9; ICX: 18 };
}

export namespace IconBuilder {
    class CallBuilder {
        /**
         * Creates an instance of CallBuilder.
         */
        constructor();

        /**
         * Set 'to' property
         */
        to(to: string): this;

        /**
         * Set 'from' property
         */
        from(from: string): this;

        /**
         * Set 'method' property
         */
        method(method: string): this;

        /**
         * Set 'params' property
         */
        params(params: KeyValue): this;

        /**
         * Build 'Call' object
         */
        build(): Call;
    }
}

export namespace IconConverter {
    /**
     * Convert string or BigNumber value to number.
     */
    function toNumber(value: BigNumber.Value): number;

    /**
     * Convert string or number value to BigNumber.
     */
    function toBigNumber(value: BigNumber.Value): BigNumber;

    /**
     * Convert string, number or BigNumber value to hex string strictly.
     */
    function toHexNumber(value: BigNumber.Value): string;

    /**
     * Convert string, number or BigNumber value to hex string.
     */
    function toHex(value: BigNumber.Value): string;
}

export class IconWallet {
    /**
     * Creates an instance of Wallet.
     */
    constructor(privateKey: Key, publicKey?: null | undefined);
    constructor(privateKey: null | undefined, publicKey: Key);

    /**
     * Creates an instance of Wallet.
     */
    static create(): IconWallet;

    /**
     * Import existing wallet instance using private key.
     */
    static loadPrivateKey(privateKey: Key): IconWallet;

    /**
     * Import existing wallet instance using keystore object.
     */
    static loadKeystore(keystore: object | string, password: string, nonStrict?: boolean): IconWallet;

    /**
     * Get private key of wallet instance.
     */
    getPrivateKey(): string;

    /**
     * Get public key of wallet instance.
     */

    getPublicKey(): string;

    /**
     * Get EOA address of wallet instance.
     */
    getAddress(): string;
}

export namespace IconValidator {
    /**
     * Check if input value is a private key.
     */
    function isPrivateKey(value: Key): boolean;

    /**
     * Check if input value is a public key.
     */
    function isPublicKey(value: Key): boolean;

    /**
     * Check if input value is a EOA address.
     */
    function isEoaAddress(value: any): boolean;

    /**
     * Check if input value is a SCORE address.
     */
    function isScoreAddress(value: any): boolean;

    /**
     * Check if input value is a EOA or SCORE address.
     */
    function isAddress(value: any): boolean;
}

export class HttpProvider {
    /**
     * Creates an instance of HttpProvider.
     */
    constructor(url: string);

    // TODO
    request(value: KeyValue, converter: any): HttpCall;
}
