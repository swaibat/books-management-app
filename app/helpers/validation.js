
function validate(object, data, cb) {
  for (const key in data) {
    let error;
    const value = data[key];
    let objValue = object[key];
    objValue && typeof objValue !== 'string'
      ? (objValue = objValue.toString())
      : '';

    value.req && (!object[key] || !objValue)
      ? (error = `${key} is required`)
      : '';
      
    value.min && objValue && objValue.length < value.min
      ? (error = `${key} should be greater than ${value.min - 1}`)
      : '';

    value.max && objValue && objValue.length > value.max
      ? (error = `${key} should be less than ${value.max}`)
      : '';

    value.email
      && objValue
      && !objValue.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      ? (error = `Invalid ${key} address`)
      : '';

    value.confirm && objValue && !value.confirm.match(objValue)
      ? (error = `${key} provided do not match`)
      : '';

    if (error) {
      return cb(error);
    }
  }
}

export default validate;
