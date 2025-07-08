import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sprite from 'svg-sprite';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcBase = path.resolve(__dirname, '../src/sprites');
const distBase = path.resolve(__dirname, '../public/sprites');

const configTemplate = (spriteName) => ({
    mode: {
        symbol: {
            dest: distBase,
            sprite: `${spriteName}.svg`,
            example: false,
        },
    },
    shape: {
        id: {
            generator: 'icon-%s',
        },
    },
    svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
    },
});

function buildSprite(folder) {
    return new Promise((resolve, reject) => {
        const folderPath = path.join(srcBase, folder);
        const config = configTemplate(folder);
        const spriter = new sprite(config);

        // Find all SVG files in the current folder
        const files = glob.sync('**/*.svg', { cwd: folderPath });

        if (files.length === 0) {
            // Skip empty folders (no icons to process)
            return resolve();
        }

        // Add each SVG file to the spriter instance
        files.forEach((file) => {
            const fullPath = path.join(folderPath, file);
            const contents = fs.readFileSync(fullPath, 'utf-8');
            spriter.add(fullPath, null, contents);
        });

        // Compile the sprite
        spriter.compile((err, result) => {
            if (err) return reject(err);

            // Write each output file to disk
            for (const mode in result) {
                for (const res in result[mode]) {
                    const { path: outPath, contents } = result[mode][res];
                    fs.mkdirSync(path.dirname(outPath), { recursive: true });
                    fs.writeFileSync(outPath, contents);
                }
            }
            console.log(`Sprite ${folder}.svg built successfully`);
            resolve();
        });
    });
}

async function run() {
    const folders = fs.existsSync(srcBase)
        ? fs
              .readdirSync(srcBase)
              .filter((f) => fs.statSync(path.join(srcBase, f)).isDirectory())
        : [];

    for (const folder of folders) {
        await buildSprite(folder);
    }
}

run().catch((e) => {
    console.error('Sprite assembly error:', e);
    process.exit(1);
});
