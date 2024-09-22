import { cn } from ".";

describe("cn", () => {
  it("returns a class string with the correct format", () => {
    expect(cn("foo", "bar")).toEqual("foo bar");
    expect(cn("foo", { bar: true })).toEqual("foo bar");
    expect(cn({ foo: true }, { bar: false })).toEqual("foo");
  });
});
