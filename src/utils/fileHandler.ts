import fs from 'fs';

export function readFile(fileName: string): Promise<object> {
    return new Promise((resolve, reject) => {
        fs.readFile(`${fileName}.json`, (err, data) => {
            if (err) reject(err);
            
            try {
                resolve(JSON.parse(data.toString()));
            }
            catch (parseError) {
                reject(new Error(`Error parsing JSON from file ${fileName}.json`));
            }
        });
    });
}

export function writeFile(fileName: string, data: object): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${fileName}.json`, JSON.stringify(data, null, 2), (err) => {
            if (err) reject(err);
            
            resolve();
        });
    });
}   