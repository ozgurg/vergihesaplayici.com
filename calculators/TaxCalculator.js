/**
 * @abstract
 * @class TaxCalculator
 */
class TaxCalculator {
    /**
     * @protected
     * @param {Function[]} functionsToCall
     */
    callInOrder(functionsToCall) {
        functionsToCall.forEach(func => func.call(this));
    }

    /**
     * @protected
     * @param {Function[]} functionsToCall
     */
    callInReverseOrder(functionsToCall) {
        functionsToCall.reverse().forEach(func => func.call(this));
    }
}

export default TaxCalculator;
