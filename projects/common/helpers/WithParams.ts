export const WithParams = (props?: string[]) => {
  let path = "";

  if (props?.includes) {
    path = "?";

    props?.forEach((include) => {
      path += `with=${include}&`;
    });
  }

  path = path.slice(0, path.length - 1);

  return path;
};
