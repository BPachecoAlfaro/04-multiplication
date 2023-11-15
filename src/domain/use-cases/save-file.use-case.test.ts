import { afterEach } from 'node:test';
import { SaveFile } from './save-file.use-case';
import fs from 'fs';

describe('save-file.use-case', () => {

    // beforeEach( () => {
    //     // clean up
    //     fs.rmSync('outputs', { recursive: true })
    // });

    afterEach(() => {
        fs.rmSync('outputs', { recursive: true });
    });

    test('should save file with defauilt values', () => {

        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt'
        const options = {
            fileContent: 'test content'
        };

        const result = saveFile.execute( options );
        
        const fileExist = fs.existsSync( filePath );
        const fileContent = fs.readFileSync( filePath, { encoding: 'utf-8'});
        
        expect( result ).toBe( true );
        expect( fileExist ).toBe(true);
        expect( fileContent ).toBe( options.fileContent );

    });

});