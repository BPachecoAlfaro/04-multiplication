import { ServerApp } from './server-app';

describe('Server app', () => {

    test('should create ServerApp instance', () => {

        const serverApp = new ServerApp();
        expect( serverApp ).toBeInstanceOf( ServerApp );
        expect( typeof ServerApp.run ).toBe('function');

    });


});