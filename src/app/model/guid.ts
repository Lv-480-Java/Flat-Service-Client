// Poached from: https://github.com/Steve-Fenton/TypeScriptUtilities
// @dynamic
export class Guid {
    static newGuid() {
      // tslint:disable-next-line:only-arrow-functions
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          // tslint:disable-next-line:no-bitwise triple-equals prefer-const one-variable-per-declaration
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
