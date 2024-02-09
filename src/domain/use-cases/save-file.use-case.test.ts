import { SaveFile } from './save-file.use-case';
import fs from 'fs';

describe('save-file.use-case', () => {
    
    
    // beforeEach( () => {
    //     const outputFolderExists = fs.existsSync('outputs');
    //     if ( outputFolderExists ) fs.rmSync('outputs', { recursive: true });
        
    // });
    const customOptions = {
        fileContent: 'Custom content',
        fileDestination: 'custom-outputs',
        fileName: 'custom-table-name',
    };

    
    afterEach(() => {
        // const outputFolderExists = fs.existsSync('outputs');
        // if ( outputFolderExists ) fs.rmSync('outputs', { recursive: true });

        const customOutputFolderExists = fs.existsSync('custom-outputs');
        if ( customOutputFolderExists ) fs.rmSync('custom-outputs', { recursive: true });
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
    
    test('should save file with custom values', () => {
        
        const saveFile = new SaveFile();
    
        
        const filePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`
        
        const result = saveFile.execute( customOptions );
        const fileExist = fs.existsSync( filePath );
        const fileContent = fs.readFileSync( filePath , { encoding: 'utf8'});
        
        expect( result ).toBe( true );
        expect( fileExist ).toBe(true);
        expect( fileContent ).toBe( customOptions.fileContent );
        
    });

    test('should return false if dicrectory could not be created', () => {

        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing'); }
        );

        const result = saveFile.execute(customOptions);
        expect( result ).toBe( false );
        mkdirSpy.mockRestore();


    });

    test('should return false if file could not be creater', () => {

        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom writing error message') }
        );

        const result = saveFile.execute( { fileContent: 'Hola '} );
        expect( result ).toBe( false );


        writeFileSpy.mockRestore();
    });
});