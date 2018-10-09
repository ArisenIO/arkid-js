import {
	Plugin,
	PluginTypes,
	Blockchains,
	Network,
	SocketService
} from 'arkid-js-core';

const proxy = (dummy, handler) => new Proxy(dummy, handler);
let cache = {};

export default class ArkIdRSN extends Plugin {

    constructor(){
        super(Blockchains.RSN, PluginTypes.BLOCKCHAIN_SUPPORT);
    }

    hookProvider(network){
        return signargs => {
            return new Promise(resolve => {
                console.log('signargs', JSON.stringify(signargs))
                const payload = Object.assign(signargs, { blockchain:Blockchains.RSN, network, requiredFields:{} });
                SocketService.sendApiRequest({
                    type:'requestSignature',
                    payload
                }).then(x => resolve(x.signatures))
            })
        }
    }

    signatureProvider(...args){

        const throwIfNoIdentity = args[0];

        // Protocol will be deprecated.
        return (network, _rsn, _options = {}) => {

            network = Network.fromJson(network);
            if(!network.isValid()) throw Error.noNetwork();
            const httpEndpoint = `${network.protocol}://${network.hostport()}`;

            const chainId = network.hasOwnProperty('chainId') && network.chainId.length ? network.chainId : _options.chainId;

            // The proxy stands between the arisenjs object and arkid.
            // This is used to add special functionality like adding `requiredFields` arrays to transactions
            return proxy(_rsn({httpEndpoint, chainId}), {
                get(rsnInstance, method) {

                    let returnedFields = null;

                    return (...args) => {

                        if(args.find(arg => arg.hasOwnProperty('keyProvider'))) throw Error.usedKeyProvider();

                        // The signature provider which gets elevated into the user's ArkId
                        const signProvider = async signargs => {
                            console.log('signargs', JSON.stringify(signargs))
                            throwIfNoIdentity();

                            const requiredFields = args.find(arg => arg.hasOwnProperty('requiredFields')) || {requiredFields:{}};
                            const payload = Object.assign(signargs, { blockchain:Blockchains.RSN, network, requiredFields:requiredFields.requiredFields });
                            const result = await SocketService.sendApiRequest({
                                type:'requestSignature',
                                payload
                            });

                            // No signature
                            if(!result) return null;

                            if(result.hasOwnProperty('signatures')){
                                // Holding onto the returned fields for the final result
                                returnedFields = result.returnedFields;

                                // Grabbing buf signatures from local multi sig sign provider
                                let multiSigKeyProvider = args.find(arg => arg.hasOwnProperty('signProvider'));
                                if(multiSigKeyProvider){
                                    result.signatures.push(multiSigKeyProvider.signProvider(signargs.buf, signargs.sign));
                                }

                                // Returning only the signatures to arisenjs
                                return result.signatures;
                            }

                            return result;
                        };

                        return new Promise((resolve, reject) => {

                            // Moving to a caching system to avoid
                            // rebuilding internal arisenjs caches
                            const getOrCache = () => {
                                const unique = JSON.stringify(Object.assign(_options, {httpEndpoint, chainId}));
                                if(!cache.hasOwnProperty(unique)) cache[unique] = _rsn(Object.assign(_options, {
                                    httpEndpoint,
                                    signProvider,
                                    chainId
                                }));
                                return cache[unique];
                            };

                            let rsn = getOrCache();

                            getOrCache()[method](...args)
                                .then(result => {

                                    // Standard method ( ie. not contract )
                                    if(!result.hasOwnProperty('fc')){
                                        result = Object.assign(result, {returnedFields});
                                        resolve(result);
                                        return;
                                    }

                                    // Catching chained promise methods ( contract .then action )
                                    const contractProxy = proxy(result, {
                                        get(instance,method){
                                            if(method === 'then') return instance[method];
                                            return (...args) => {
                                                return new Promise(async (res, rej) => {
                                                    instance[method](...args).then(actionResult => {
                                                        res(Object.assign(actionResult, {returnedFields}));
                                                    }).catch(rej);
                                                })

                                            }
                                        }
                                    });

                                    resolve(contractProxy);
                                }).catch(error => reject(error))
                        })
                    }
                }
            }); // Proxy

        }
    }
}

if(typeof window !== 'undefined') {
	window.ArkIdRSN = ArkIdRSN;
}
