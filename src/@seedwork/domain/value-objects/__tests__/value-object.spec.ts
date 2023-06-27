import ValueObject from "../value-object";

class StubValueObject extends ValueObject{}

describe('ValueObject Unit Tests', () => {
    it('should set value', () => {
        let vo = new StubValueObject('string value')
        expect(vo.value).toBe('string value')

        vo = new StubValueObject({prop1: 'value1'})
        expect(vo.value).toStrictEqual({prop1: 'value1'})
    })

    it('should convert to a string', () => {
        const date = new Date();
        let arrange = [
            { recived: null, expected: "null" },
            { recived: undefined, expected: "undefined" },
            { recived: "", expected: "" },
            { recived: "fake test", expected: "fake test" },
            { recived: 0, expected: "0" },
            { recived: 1, expected: "1" },
            { recived: 5, expected: "5" },
            { recived: true, expected: "true" },
            { recived: false, expected: "false" },
            { recived: date, expected: date.toString() },
            { recived: { prop1: 'value1' }, expected: JSON.stringify({ prop1: 'value1' }) },
        ]

        arrange.forEach(value => {
            const vo = new StubValueObject(value.recived)
            expect(vo + "").toBe(value.expected)  
        });

    })
})