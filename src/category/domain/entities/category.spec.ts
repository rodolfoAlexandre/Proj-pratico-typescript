import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import { Category, CategoryProperties } from "./category"
import { omit } from "lodash"

describe('Category Unit Tests', () => {
    test('constructor of category', () => {

        let category  = new Category(
            {
                name: "Movie"
            }
        );

        let props = omit(category.props, 'created_at')

        expect(props).toStrictEqual(
            {
                name: "Movie",
                description: null,
                is_active: true,
            }
        )

        expect(category.props.created_at).toBeInstanceOf(Date)

        let created_at = new Date()

        category  = new Category(
            {
                name: "Movie",
                description: "Some description",
                is_active: false,
                created_at
            }
        )

        expect(category.props).toStrictEqual(
            {
                name: "Movie",
                description: "Some description",
                is_active: false,
                created_at
            }
        )

        category  = new Category(
            {
                name: "Movie",
                description: "Some description"
            }
        )

        expect(category.props).toMatchObject(
            {
                name: "Movie",
                description: "Some description"
            }
        )

        category  = new Category(
            {
                name: "Movie",
                is_active: true
            }
        )

        expect(category.props).toMatchObject(
            {
                name: "Movie",
                is_active: true
            }
        )

        created_at = new Date()

        category  = new Category(
            {
                name: "Movie",
                created_at
            }
        )

        expect(category.props).toMatchObject(
            {
                name: "Movie",
                created_at
            }
        )
    })

    test('id field', () => {

        type CategoryData = {props: CategoryProperties, id?: UniqueEntityId }
        const data: CategoryData[] = [
            { props: { name: 'Movie'} },
            { props: { name: 'Movie'}, id: null },
            { props: { name: 'Movie'}, id: undefined },
            { props: { name: 'Movie'}, id: new UniqueEntityId() },
        ]

        data.forEach(i => {
            const category  = new Category(i.props, i.id as any)
            expect(category.id).not.toBeNull()
            expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
        });     
    })    

    test('getter of name props', () => {
        const category  = new Category({ name: "Movie" })
        expect(category.name).toBe('Movie')
    })

    test('getter and setter of description props', () => {

        let category  = new Category({ name: "Movie" })
        expect(category.description).toBeNull();

        category  = new Category({ name: "Movie", description: "Some description" })
        expect(category.description).toBe('Some description')

        category  = new Category({ name: "Movie" })

        category["description"] = 'Other description'
        expect(category.description).toBe('Other description')

        category["description"] = undefined
        expect(category.description).toBeNull();

        category["description"] = null
        expect(category.description).toBeNull();        
    })
    
    test('getter and setter of is_active props', () => {

        let category  = new Category({ name: "Movie" })
        expect(category.is_active).toBeTruthy();

        category  = new Category({ name: "Movie", is_active: true })
        expect(category.is_active).toBeTruthy();

        category  = new Category({ name: "Movie", is_active: false })
        expect(category.is_active).toBeFalsy();        

    })

    test('getter and setter of created_at props', () => {

        let category  = new Category({ name: "Movie" })
        expect(category.created_at).toBeInstanceOf(Date);

        let created_at = new Date()
        category  = new Category({ name: "Movie", created_at })
        expect(category.created_at).toBe(created_at);      

    })

    test("should update a name and description of category", () => {
        const category  = new Category({ name: "Movie" })
        expect(category.name).toBe('Movie')

        category.update('Movie 2')
        expect(category.name).toBe('Movie 2')

        expect(category.description).toBeNull()

        category.update('Movie 3', 'Description 3')
        expect(category.name).toBe('Movie 3')

        expect(category.description).toBe('Description 3')
    })
});