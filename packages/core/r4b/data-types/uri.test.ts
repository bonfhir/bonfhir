import { fhirURITypeAdapter } from "./URI";

describe("fhirURITypeAdapter", () => {
  ["en-us", undefined].forEach((locale) => {
    describe(`with ${locale} as locale`, () => {
      const adapter = fhirURITypeAdapter(locale);

      it("exposes the locale", () => {
        expect(adapter.locale).toEqual(locale);
      });

      describe("parse and format", () => {
        it.each([
          "ftp://ftp.is.co.za/rfc/rfc1808.txt",
          "http://www.ietf.org/rfc/rfc2396.txt",
          "ldap://[2001:db8::7]/c=GB?objectClass?one",
          "mailto:John.Doe@example.com",
          "news:comp.infosystems.www.servers.unix",
          "tel:+1-816-555-1212",
          "telnet://192.0.2.16:80/",
          "urn:oasis:names:specification:docbook:dtd:xml:4.1.2",
        ])("parse %p", (value) => {
          const parsedValue = adapter.parse(value);

          expect(parsedValue).toEqual(new URL(value));
          expect(adapter.format(parsedValue)).toEqual(value);
          expect(adapter.format(value)).toEqual(value);
        });
      });
    });
  });

  describe("with an unknown locale", () => {
    it("raises an error", () => {
      expect(() => fhirURITypeAdapter("nope")).toThrowError(
        "Incorrect locale information provided"
      );
    });
  });
});
