const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const MASTER_MULTIADDR = '/ip4/54.191.195.43/tcp/4002/ws/ipfs/QmSnZApBKGea2C3j6r7bWGCZWQQjpsmAhhBKaNVNVGnUJw'
// const MASTER_MULTIADDR= '/dns4/ws-star.discovery.libp2p.io/wss/p2p-websocket-star/ipfs/QmTQ1ttKqWxwWNTrqF1Qv2Pg92kDwL7bkrrPhXdgXwMTQN'
// /ip4/172.29.38.17/tcp/4002/ipfs/QmTAzJVyka9KStvBiGcB2xs8ByBJRL34KeaM9atMEHUbjf
let DB_ADDRESS
let db, orbitdb, identity;

class Orbit {

    constructor(address){
        this.DB_ADDRESS=address
    }
    // onReplication = () => {
    //         db.events.on('replicated',()=>{
    //         console.log('Replication fired!!!')
    //         const latest = db.iterator({ limit: -1 }).collect()
    //         return { latest };
    //     })
    // }

    startingIPFS = async () => {
    
        window.ipfs = new IPFS({
            // preload: { enabled: true , addresses: ['/dns4/node1.preload.ipfs.io/https'] },
            repo: './orbitdb/examples/ipfs',
            start: true,
            EXPERIMENTAL: {

                pubsub: true,
            },
            config: {
                "Bootstrap": [
                    MASTER_MULTIADDR,
                    '/ip4/54.191.195.43/tcp/4001/ipfs/QmSnZApBKGea2C3j6r7bWGCZWQQjpsmAhhBKaNVNVGnUJw',
                    // // '/dnsaddr/bootstrap.libp2p.io/ipfs/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
                    // // "/dnsaddr/bootstrap.libp2p.io/ipfs/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
                    // // "/dnsaddr/bootstrap.libp2p.io/ipfs/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
                    // // "/dnsaddr/bootstrap.libp2p.io/ipfs/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
                    "/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
                    "/ip4/104.236.179.241/tcp/4001/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM",
                    "/ip4/128.199.219.111/tcp/4001/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu",
                    "/ip4/104.236.76.40/tcp/4001/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64",
                    "/ip4/178.62.158.247/tcp/4001/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd",
                    "/ip6/2604:a880:1:20::203:d001/tcp/4001/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM",
                    "/ip6/2400:6180:0:d0::151:6001/tcp/4001/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu",
                    "/ip6/2604:a880:800:10::4a:5001/tcp/4001/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64",
                    "/ip6/2a03:b0c0:0:1010::23:1001/tcp/4001/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd"
                ]
            },
            relay: {
                enabled: true, // enable circuit relay dialer and listener
                hop: {
                    enabled: true // enable circuit relay HOP (make this node a relay)
                }
            }

        })
    
        // ipfs.on('error', (err) => console.error(err))
        await window.ipfs.ready

        // window.ipfs.once('ready', async () => {
        console.log(`ipfs ready.`)
        // await ipfs.swarm.connect(MASTER_MULTIADDR)
        try {
            // console.log('Connecting master node',MASTER_MULTIADDR)
            // await window.ipfs.swarm.connect(MASTER_MULTIADDR)
            orbitdb = await OrbitDB.createInstance(window.ipfs);

            window.ipfs.on("replicated", () => {
                console.log(`replication event fired`);
            })
            // Make the DB public, so that anyone can write.
            // const options = {
            //     accessController: {
            //         write: ["*"]
            //     }
            // }
            console.log('orbit instantiated')
            console.log(orbitdb.identity.id)
            identity = orbitdb.identity.id
                console.log('connecting database')
                db = await orbitdb.eventlog(this.DB_ADDRESS);

                await db.load();
                console.log(db.id)
                console.log('####'+db)
                // this.onReplication()
                return db

                // await db.events.on('replicated',()=>{console.log('Replication fired!!!')})
            
        } catch (e) {
            window.ipfs.stop();
            console.log('eroooor')
            console.error(e)
            process.exit(1)
        }
       
    }
    //             identity = orbitdb.identity.id
    //             console.log('connecting database')
    //             db = await orbitdb.eventlog(DB_ADDRESS);

    //             await db.load();
    //             console.log(db.id)
    //             console.log('####'+db)
    //             // this.onReplication()
    //             return db

    //             // await db.events.on('replicated',()=>{console.log('Replication fired!!!')})
    //         } catch (e) {
    //             console.log('eroooor')
    //             console.error(e)
    //             process.exit(1)
    //         }
    //     // })
    // }
    
    addingToDB = async (entry) => {

        try {
            
            await db.add(entry)
            await db.events.on('replicated', () => { console.log('Replication fired@@@!!!') })
            const latest = db.iterator({ limit: -1 }).collect()

            console.log('worker addding to db')
            console.log(latest)
            return latest;
        } catch (e) {
            console.error(e)
            process.exit(1)
        }
    }
    gettingId = () => {
        console.log(identity)
        return identity
    }
}
export default Orbit