export const tasks = [
  {
    id: 'f8cd8ff3-d1de-47a5-820e-73a58368b22e',
    createdAt: new Date(),
    authorId: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    title: 'Create Promise',
    isDone: true,
    priority: 20,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    description:
      'The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.',
  },
  {
    id: '76e9d529-a303-41c5-86e4-e2c54985b373',
    createdAt: new Date(),
    authorId: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    title: 'Create Map',
    isDone: false,
    priority: 15,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 10)),
    description:
      'he Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.',
  },
  {
    id: 'c204715d-1164-46d7-aadd-bf15721bbda8',
    createdAt: new Date(),
    authorId: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    title: 'Create Error',
    isDone: false,
    priority: 35,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    description:
      'Error objects are thrown when runtime errors occur. The Error object can also be used as a base object for user-defined exceptions. See below for standard built-in error types.',
  },
  {
    id: 'a0807840-946f-424d-b67b-8026bb14067a',
    createdAt: new Date(),
    authorId: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    title: 'Create RegExp',
    isDone: true,
    priority: 35,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    description: 'The RegExp object is used for matching text with a pattern.',
  },
  {
    id: '9a62a0c1-9ddc-4d82-8983-d3057ec5cb91',
    createdAt: new Date(),
    authorId: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    title: 'Create Array',
    isDone: false,
    priority: 99,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 15)),
    description:
      'The JavaScript Array class is a global object that is used in the construction of arrays; which are high-level, list-like objects.',
  },
  {
    id: '2a62f642-e499-4779-b415-7297fe716578',
    createdAt: new Date(),
    authorId: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    title: 'Create Set',
    isDone: false,
    priority: 34,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 25)),
    description:
      'The Set object lets you store unique values of any type, whether primitive values or object references.',
  },
  {
    id: 'e0e4c236-c208-46b4-acf3-4973ad805bb7',
    createdAt: new Date(),
    authorId: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    title: 'Create Generator',
    isDone: false,
    priority: 75,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    description:
      'The Generator object is returned by a generator function and it conforms to both the iterable protocol and the iterator protocol.',
  },
  {
    id: '22c9bbd0-20a7-4e22-9f0c-f74df23c39ed',
    createdAt: new Date(),
    authorId: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    title: 'Create Proxy',
    isDone: true,
    priority: 15,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 20)),
    description:
      'The Proxy object enables you to create a proxy for another object, which can intercept and redefine fundamental operations for that object.',
  },
  {
    id: '4b389ba3-c689-4595-888c-7233f7e7e7a4',
    createdAt: new Date(),
    title: 'Create Optional chaining (?.)',
    isDone: false,
    priority: 15,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 17)),
    description: `The optional chaining operator (?.) enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.
      The ?. operator is like the . chaining operator, except that instead of causing an error if a reference is nullish (null or undefined), the expression short-circuits with a return value of undefined. When used with function calls, it returns undefined if the given function does not exist.
      This results in shorter and simpler expressions when accessing chained properties when the possibility exists that a reference may be missing. It can also be helpful while exploring the description of an object when there's no known guarantee as to which properties are required.
      Optional chaining cannot be used on a non-declared root object, but can be used with an undefined root object.`,
    authorId: 'c5fa3b2f-c4de-4dda-84e7-714ee852627e',
  },
  {
    id: '8b4127cd-700c-4e5b-896b-c0284f6a7ae6',
    createdAt: new Date(),
    title: 'Create Nullish coalescing operator (??)',
    isDone: false,
    priority: 80,
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    description: `The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
    This can be contrasted with the logical OR (||) operator, which returns the right-hand side operand if the left operand is any falsy value, not only null or undefined. In other words, if you use || to provide some default value to another variable foo, you may encounter unexpected behaviors if you consider some falsy values as usable (e.g., '' or 0). See below for more examples.
    The nullish coalescing operator has the fifth-lowest operator precedence, directly lower than || and directly higher than the conditional (ternary) operator.`,
    authorId: 'c5fa3b2f-c4de-4dda-84e7-714ee852627e',
  },
  {
    id: 'd4f125ed-9354-4a23-ad3e-452c52e89aec',
    createdAt: new Date(),
    title: 'Create Logical OR (||)',
    isDone: false,
    priority: 10,
    dueDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    description: `The logical OR (||) operator (logical disjunction) for a set of operands is true if and only if one or more of its operands is true.
    It is typically used with Boolean (logical) values.
    When it is, it returns a Boolean value.
    However, the || operator actually returns the value of one of the specified operands, so if this operator is used with non-Boolean values, it will return a non-Boolean value.`,
    authorId: '3541af71-9d5b-4ca5-a74a-f629aea76735',
  },
  {
    id: 'd437e957-3c17-4cd6-aa20-8b5514568424',
    createdAt: new Date(),
    title: 'Create Addition assignment (+=)',
    isDone: false,
    priority: 45,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    description: `The addition assignment operator (+=) adds the value of the right operand to a variable and assigns the result to the variable.
    The types of the two operands determine the behavior of the addition assignment operator.
    Addition or concatenation is possible.
    `,
    authorId: '3541af71-9d5b-4ca5-a74a-f629aea76735',
  },
  {
    id: '51fee5ee-010b-4865-9497-bae44d50eb32',
    createdAt: new Date(),
    title: 'Create Bitwise AND (&)',
    isDone: true,
    priority: 35,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 10)),
    description: `The bitwise AND operator (&) returns a 1 in each bit position for which the corresponding bits of both operands are 1s.
    `,
    authorId: '3541af71-9d5b-4ca5-a74a-f629aea76735',
  },
  {
    id: 'd7fe5fb3-58a9-40d5-b2f0-11be41b0880e',
    createdAt: new Date(),
    title: 'Create Bitwise AND (&)',
    isDone: false,
    priority: 68,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 4)),
    description:
      'The bitwise AND operator (&) returns a 1 in each bit position for which the corresponding bits of both operands are 1s. Syntax: a & b',
    authorId: 'bf873638-9388-4298-94b0-3d1a11ef8688',
  },
  {
    id: 'c87b0e16-3441-47ec-aac1-b21d6f79123e',
    createdAt: new Date(),
    title: 'Create Bitwise AND assignment (&=)',
    isDone: false,
    priority: 68,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    description:
      'The bitwise AND assignment operator (&=) uses the binary representation of both operands, does a bitwise AND operation on them and assigns the result to the variable.',
    authorId: 'bf873638-9388-4298-94b0-3d1a11ef8688',
  },
];
