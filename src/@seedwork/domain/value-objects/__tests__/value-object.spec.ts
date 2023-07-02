import { deepFreeze } from "@seedwork/domain/utils/object";
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
            // { recived: null, expected: "null" },
            // { recived: undefined, expected: "undefined" },
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

    it('should be a immutable object', () => {
        const obj = { 
            prop1: "prop1", 
            deep: { 
                prop2: "prop2",
                prop3: new Date()
            } 
        }

        const vo = new StubValueObject(obj)

        expect(() => { (vo as any).value.prop1 = 'aaaa' }).toThrow(
           "Cannot assign to read only property 'prop1' of object '#<Object>'"
        )

        expect(() => { (vo as any).value.deep.prop2 = 'aaaa' }).toThrow(
            "Cannot assign to read only property 'prop2' of object '#<Object>'"
         )

        expect(vo.value.deep.prop3).toBeInstanceOf(Date)
    })
})