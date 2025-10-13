export const Functions = {
  GenerateUUID() {
    return crypto.randomUUID().toString();
  },
  GetCopy(object: any) {
    return JSON.parse(JSON.stringify(object));
  },
  IsValidEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
};
