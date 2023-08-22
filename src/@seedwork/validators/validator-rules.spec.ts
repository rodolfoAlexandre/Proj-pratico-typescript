import ValidationError from "../errors/validation-error";
import ValidatorRules from "./validator-rules";

type Values = {
  value: any;
  property: string;
};

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[]
};

function assertIsInvalid({ value, property, rule, error, params = [] } : ExpectedRule) {
  expect(() => {
    const validador = ValidatorRules.values(value, property);
    const method  = validador[rule]
    method.apply(validador, params);
  }).toThrow(error);
}

function assertIsValid({ value, property, rule, error, params = [] }  : ExpectedRule) {
  expect(() => {
    const validador = ValidatorRules.values(value, property)
    const method  = validador[rule]
    method.apply(validador, params);
  }).not.toThrow(error);
}

describe("ValidatorRules Unit Tests", () => {
  test("values method", () => {
    const validator = ValidatorRules.values("some value", "field");
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("some value");
    expect(validator["property"]).toBe("field");
  });

  test("required validation rule", () => {
    let arrange: Values[] = [
      {
        value: null,
        property: "field",
      },
      {
        value: undefined,
        property: "field",
      },
      {
        value: "",
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "required",
        error: new ValidationError("The field is required"),
      });
    });

    arrange = [
      {
        value: 5,
        property: "field",
      },
      {
        value: 0,
        property: "field",
      },
      {
        value: false,
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "required",
        error: new ValidationError("The field is required"),
      });
    });
  });

  test("string validation rule", () => {
    let arrange: Values[] = [
      {
        value: 5,
        property: "field",
      },
      {
        value: {},
        property: "field",
      },
      {
        value: false,
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "string",
        error: new ValidationError("The field must be a string"),
      });
    });

    arrange = [
      {
        value: 'test',
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "string",
        error: new ValidationError("The field must be a string"),
      });
    });
  });

  test("maxLength validation rule", () => {
    let arrange: Values[] = [
      {
        value: "aaaaaa",
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error: new ValidationError("The field must be less or equal then 5 characters"),
        params: [5]
      });
    });

    arrange = [
      {
        value: "aaaaa",
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error: new ValidationError("The field must be less or equal then 5 characters"),
        params: [5]
      });
    });
  });  
});

