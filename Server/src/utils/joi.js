export function validateReq(schema, data) {
    console.log(data)
  return schema.validate(data, { abortEarly: false, allowUnknown: true });
}
