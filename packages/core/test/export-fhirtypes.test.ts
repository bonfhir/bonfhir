import path from 'node:path';

const releases = ['r4b', 'r5'];
const formats = ['cjs', 'esm'];

describe('Fhir type exports', () => {
      for (const release of releases) {
            for (const format of formats) {
                  const distPath = path.join(
                        process.cwd(),
                        'dist',
                        release,
                        format
                  );
                  
                  test(`${release} ${format} JavaScript exports`, async () => {
                        const indexPath = path.join(distPath, `index.${format === 'cjs' ? 'c' : 'm'}js`);
                        const module = await import(indexPath);

                        // Debug: list all module keys
                        console.log(`Module keys: ${Object.keys(module)}`);
                        
                        // Check for some expected FHIR types
                        expect(module.Patient).toBeDefined();
                        expect(module.Observation).toBeDefined();
                  });

                  // TODO: test typescript declaration exports fhir types
            }
      }
});
