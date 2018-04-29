const Validator = require('jsonschema').Validator;
const defaults = require('json-schema-defaults');
let users = [];

const user = {
  title: 'User',
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    username: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    isAdmin: {
      type: 'boolean',
      default: false
    }
  }
};

exports.validate = (json) => {
  const validator = new Validator();

  if (validator.validate(json, user).errors.length > 0) {
    console.error(validator.validate(json, user).errors);
    throw new Error('Invalid exam data');
  }
};

exports.defaults = (user) => {
  return defaults(user);
};

exports.create = (user) => {
  users.push(user);
};

exports.findOne = (object) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => {
      const keys = Object.keys(object);

      console.log(keys);
      let boolAcc = true;

      keys.forEach((key) => {
        console.log(`user[${key}]: ${user[key]}`);
        console.log(`object[${key}]: ${object[key]}`);
        if (user[key] !== object[key]) {
          boolAcc = false;
        }
      });

      return boolAcc;
    });

    if (user) {
      resolve(user);
    }
    else {
      resolve(null);
    }
  });
};
