// import ArkIdJS from '../src/arkid';
// import SocketService from '../src/services/SocketService';
// import { assert } from 'chai';
// import 'mocha';
//
// const network = {
//     blockchain:'rsn',
//     protocol:'http',
//     host:'192.168.1.6',
//     port:8888,
//     chainId:'fffa80dc4492fedaa90cbc4ee6f5520568826dfb31ed9c8c161224349f6b82f5'
// }
//
// let arkid, identity;
//
// describe('Api', () => {
//
//     it('should create a connection to ArkId', done => {
//         new Promise(async() => {
//             ArkIdJS.arkid.connect("Test Plugin").then(connected => {
//                 assert(connected, 'Not connected');
//                 arkid = ArkIdJS.arkid;
//                 done();
//             })
//         });
//     });
//
//     it('should be able to get the ArkId version', done => {
//         new Promise(async() => {
//             const test = await SocketService.sendApiRequest({
//                 type:'getVersion',
//                 payload:{}
//             });
//             assert(test, "Could not get the version")
//             done();
//         });
//     });
//
//     it('should be able to suggest a network', done => {
//         new Promise(async() => {
//             const test = await SocketService.sendApiRequest({
//                 type:'requestAddNetwork',
//                 payload:{
//                      network
//                 }
//             });
//             assert(test, "Could not suggest the network")
//             done();
//         });
//     });
//
//     it('should be able to forget an identity', done => {
//         new Promise(async() => {
//             const test = await SocketService.sendApiRequest({
//                 type:'forgetIdentity',
//                 payload:{
//
//                 }
//             });
//             assert(!test.hasOwnProperty('isError'), "identityFromPermissions")
//             done();
//         });
//     });
//
//     it('should be able to get or request an Identity', done => {
//         new Promise(async() => {
//             const test = await SocketService.sendApiRequest({
//                 type:'getOrRequestIdentity',
//                 payload:{
//                     fields:[]
//                 }
//             });
//             assert(!test.hasOwnProperty('isError'), "getOrRequestIdentity")
//             done();
//         });
//     });
//
//     it('should be able to get an identity from permissions', done => {
//         new Promise(async() => {
//             identity = await SocketService.sendApiRequest({
//                 type:'identityFromPermissions',
//                 payload:{
//
//                 }
//             });
//             assert(!identity.hasOwnProperty('isError'), "identityFromPermissions")
//             done();
//         });
//     });
//
//     it('should be able to forget an identity', done => {
//         new Promise(async() => {
//             const test = await SocketService.sendApiRequest({
//                 type:'forgetIdentity',
//                 payload:{
//
//                 }
//             });
//             assert(!test.hasOwnProperty('isError'), "identityFromPermissions")
//             done();
//         });
//     });
//
//     it('should be able to get an identity with an account', done => {
//         new Promise(async() => {
//             identity = await SocketService.sendApiRequest({
//                 type:'getOrRequestIdentity',
//                 payload:{
//                     fields:{accounts:[network]}
//                 }
//             });
//             assert(!identity.hasOwnProperty('isError'), "getOrRequestIdentity")
//             done();
//         });
//     });
//
//     let transaction;
//
//     it('should be able to create a transaction using ArkId', done => {
//         new Promise(async() => {
//             const account = identity.accounts.find(x => x.blockchain === 'rsn');
//             transaction = await SocketService.sendApiRequest({
//                 type:'createTransaction',
//                 payload:{
//                     blockchain:'rsn',
//                     actions:[
//                         {
//                             contract:'arisen.token',
//                             action:'transfer',
//                             params:[account.name, 'arisen', '1.0000 RSN', ''],
//                         },
//                         {
//                             contract:'arisen.token',
//                             action:'transfer',
//                             params:[account.name, 'arisen', '2.0000 RSN', ''],
//                         }
//                     ],
//                     account,
//                     network
//                 }
//             });
//
//             assert(!transaction.hasOwnProperty('isError'), "identityFromPermissions")
//             done();
//         });
//     });
//
//     it('should be able to request a signature for a transaction using ArkId', done => {
//         new Promise(async() => {
//             const account = identity.accounts.find(x => x.blockchain === 'rsn');
//             const test = await SocketService.sendApiRequest({
//                 type:'requestSignature',
//                 payload:transaction
//             });
//
//             const tx = {
//                 compression:'none',
//                 transaction:transaction.transaction,
//                 signatures:test.signatures
//             };
//
//             // Testing send via standard HTTP
//             const res = await fetch(`http://${network.host}:8888/v1/chain/push_transaction`, {
//                 method: "POST",
//                 headers: {
//                     'Accept': 'application/json, text/plain, */*',
//                     'Content-Type': 'application/json'
//                 },
//                 body:JSON.stringify(tx)
//             });
//
//             const json = await res.json();
//             assert(json.hasOwnProperty('transaction_id'), "requestSignature");
//             done();
//         });
//     });
//
// });
