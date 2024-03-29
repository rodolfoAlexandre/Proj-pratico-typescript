import InvalidUuidError from "../../../errors/invalid-uuid.error"
import UniqueEntityId from "../unique-entity-id.vo"
import { validate as uuidValidade} from 'uuid'

function spyValidateMethod() {
    return jest.spyOn(UniqueEntityId.prototype as any, 'validate');
}

describe('UniqueEntityId Unit Tests', () => {
    it('Should throw error when uuid is invalid', () => {
        const validateSpy = spyValidateMethod();
        expect(() => new UniqueEntityId('fake id')).toThrowError(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalled()
    });

    it('should accept a uuid passed in constructor', () => {
        const validateSpy = spyValidateMethod();
        const uuid = '1656adde-ac6d-43f9-b38f-4cfc796da126'
        const vo = new UniqueEntityId(uuid);
        expect(vo.value).toBe(uuid)
        expect(validateSpy).toHaveBeenCalled()
    })

    it('should accept a uuid passed in constructor', () => {
        const validateSpy = spyValidateMethod();
        const vo = new UniqueEntityId();
        expect(uuidValidade(vo.value)).toBeTruthy()
        expect(validateSpy).toHaveBeenCalled()
    })    
})