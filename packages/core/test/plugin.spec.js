// import { assert } from 'chai';
// import 'mocha';
// import ArkIdJS from '../src/arkid';
// import Rsn from 'arisenjs';
//
// const network = {
//     blockchain:'rsn',
//     protocol:'http',
//     host:'192.168.1.6',
//     port:8888,
//     chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
// };
//
// let arkid, identity;
//
//
//
// describe('Plugin', () => {
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
//     it('should forget an identity if existing', done => {
//         new Promise(async() => {
//             assert(await arkid.forgetIdentity(), "Could not forget");
//             done();
//         });
//     });
//
//     it('should get an identity', done => {
//         new Promise(async() => {
//             assert(await arkid.getIdentity({accounts:[network]}), "Could not get identity");
//             done();
//         });
//     });
//
//     it('should send a transaction with rsn proxy object', done => {
//         new Promise(async() => {
//             const rsn = arkid.rsn(network, Rsn);
//             const transfer = await rsn.transfer('testacc', 'arisen', '1.0000 RSN', '');
//             assert(transfer.hasOwnProperty('transaction_id'), "Couldn't sign transfer");
//             done();
//         });
//     });
//
// });
