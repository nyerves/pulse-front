export const Functions = {
  GenerateUUID() {
    return crypto.randomUUID().toString();
  },
  GetCopy(object: any) {
    return JSON.parse(JSON.stringify(object));
  },
};
