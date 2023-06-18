import InvalidUuidError from "../errors/invalid-uuid.error"
import UniqueEntityId from "./unique-entity-id.vo"
import { validate as uuidValidade} from 'uuid'

describe('UniqueEntityId Unit Tests', () => {
    it('Should throw error when uuid is invalid', () => {
        const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
        expect(() => new UniqueEntityId('fake id')).toThrowError(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalled()
    });

    it('should accept a uuid passed in constructor', () => {
        const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
        const uuid = '1656adde-ac6d-43f9-b38f-4cfc796da126'
        const vo = new UniqueEntityId(uuid);
        expect(vo.id).toBe(uuid)
        expect(validateSpy).toHaveBeenCalled()
    })

    it('should accept a uuid passed in constructor', () => {
        const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
        const vo = new UniqueEntityId();
        expect(uuidValidade(vo.id)).toBeTruthy()
        expect(validateSpy).toHaveBeenCalled()
    })    
})