"Zod helps you define what your data should look like and then check if incoming data matches that."


npm install zod 

const zod = require('zod');


.....womp womp

const z = require('zod'); // For JavaScript
// import { z } from 'zod'; // For TypeScript/ESM

// 1. Define a schema
const userSchema = z.object({
  id: z.number().int().positive(),
  username: z.string().min(3).max(20),
  email: z.string().email(),
  age: z.number().int().min(18).optional(), // Optional property
  isActive: z.boolean().default(true), // Property with a default value
});

// 2. Data to validate
const validUserData = {
  id: 1,
  username: 'john_doe',
  email: 'john.doe@example.com',
  age: 30,
};

const invalidUserData = {
  id: 'abc', // Invalid type
  username: 'jo', // Too short
  email: 'not-an-email', // Invalid format
};

// 3. Validate the data
try {
  const parsedUser = userSchema.parse(validUserData);
  console.log('Valid User Data:', parsedUser);
  // Output: Valid User Data: { id: 1, username: 'john_doe', email: 'john.doe@example.com', age: 30, isActive: true }
} catch (error) {
  console.error('Validation Error:', error.errors);
}

try {
  userSchema.parse(invalidUserData);
} catch (error) {
  console.error('Validation Error for Invalid Data:', error.errors);
  /* Output:
  Validation Error for Invalid Data: [
    {
      "code": "invalid_type",
      "expected": "number",
      "received": "string",
      "path": [
        "id"
      ],
      "message": "Expected number, received string"
    },
    {
      "code": "too_small",
      "minimum": 3,
      "type": "string",
      "inclusive": true,
      "exact": false,
      "message": "String must contain at least 3 character(s)",
      "path": [
        "username"
      ]
    },
    {
      "validation": "email",
      "code": "invalid_string",
      "message": "Invalid email",
      "path": [
        "email"
      ]
    }
  ]
  */
}

// Using .safeParse() for non-throwing validation
const result = userSchema.safeParse(invalidUserData);
if (!result.success) {
  console.error('Safe Parse Error:', result.error.errors);
}
