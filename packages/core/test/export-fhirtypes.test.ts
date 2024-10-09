import fs from 'node:fs';
import path from 'node:path';

const releases = ['r4b', 'r5'];
const formats = ['cjs', 'esm'];

describe('FHIR type declarations', () => {
  for (const release of releases) {
    for (const format of formats) {
      test(`${release} ${format} TypeScript declarations`, () => {
        const declarationPath = path.join(
          process.cwd(),
          'dist',
          release,
          format,
          'index.d.ts'
        );

        // Check if the file exists
        expect(fs.existsSync(declarationPath)).toBe(true);

        // Read the declaration file
        const fileContents = fs.readFileSync(declarationPath, 'utf8');

        // Function to check if a type is exported
        function isTypeExported(typeName: string): boolean {
          const regex = new RegExp(`export\\s*\\{[^}]*\\btype\\s+${typeName}\\b[^}]*\\}`);
          return regex.test(fileContents);
        }

        console.log(`TypeScript declaration file contents: ${fileContents}`);

        // Check for expected FHIR types
        expect(isTypeExported('Patient')).toBe(true);
        expect(isTypeExported('Observation')).toBe(true);
        // Add more type checks as needed
      });
    }
  }
});
