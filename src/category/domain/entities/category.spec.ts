import { Category } from "./category"

describe('Category Unit Tests', () => {
    test('constructor of category', () => {

        const props = {
            name: "Movie",
            description: "description",
            is_active: true,
            created_at: new Date(),
        };

        const category  = new Category(props);
        expect(category.props).toStrictEqual(props)
    })
});