export const formatMessageWebsocket = (
  type_message: string,
  input_value: string
) =>
  JSON.stringify({
    type: type_message,
    input_value,
  });
