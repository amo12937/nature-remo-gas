const greeter = (person: string) => {
  return `Hello, ${person}!`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function testGreeter() {
  const user = "Grant";
  Logger.log(greeter(user));
}
