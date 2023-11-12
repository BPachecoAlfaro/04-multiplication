
import { yarg } from './config/plugins/args.plugin'
import { Serverapp } from './presentation/server-app';


( async () => {
    await main();
})();

async function main() {
    
    const { b: base, l:limit, s:showTable} = yarg;

    Serverapp.run({ base, limit, showTable });

}