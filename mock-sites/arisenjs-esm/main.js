import Rsn from 'arisenjs'
import ArkIdJS from 'arkid-js-core';
import ArkIdRSN from 'arkid-js-plugin-rsnjs'

// const network = {
// 	blockchain:'rsn',
// 	chainId:'fffa80dc4492fedaa90cbc4ee6f5520568826dfb31ed9c8c161224349f6b82f5',
// 	host:'greatchain.arisennodes.io',
// 	port:18888,
// 	protocol:'http'
// };

const network = {
	blockchain:'rsn',
	chainId:'fffa80dc4492fedaa90cbc4ee6f5520568826dfb31ed9c8c161224349f6b82f5',
	host:'greatchain.arisennodes.io',
	port:8888,
	protocol:'http'
};

// const network = {
// 	blockchain:'rsn',
// 	chainId:'fffa80dc4492fedaa90cbc4ee6f5520568826dfb31ed9c8c161224349f6b82f5',
// 	host:'node.arkid.io',
// 	port:443,
// 	protocol:'https'
// };


ArkIdJS.plugins( new ArkIdRSN() );
let arkid = null;

ArkIdJS.arkid.connect('LernaTest').then(connected => {
	if(!connected) return false;
	arkid = ArkIdJS.arkid;
	console.log('sc', arkid);
});

window.login = async () => {
	await arkid.suggestNetwork(network);
    await arkid.getIdentity({accounts:[network]});
};

window.logout = () => {
	arkid.forgetIdentity();
};

window.transfer = () => {
	const rsn = arkid.rsn(network, Rsn);
	const account = arkid.identity.accounts.find(x => x.blockchain === 'rsn');
	const opts = { authorization:[`${account.name}@${account.authority}`] };
	rsn.transfer(account.name, 'safetransfer', '1.0000 RSN', '', opts).then(trx => {
		console.log('trx', trx);
	}).catch(err => {
		console.error(err);
	})
};

window.hookTransfer = () => {
	console.log('arkid', arkid);
    const rsn = Rsn({httpEndpoint:`${network.protocol}://${network.host}:${network.port}`, signProvider:arkid.rsnHook(network)});
	const account = arkid.identity.accounts.find(x => x.blockchain === 'rsn');
	const opts = { authorization:[`${account.name}@${account.authority}`] };
	rsn.transfer(account.name, 'safetransfer', '1.0000 RSN', '', opts).then(trx => {
		console.log('trx', trx);
	}).catch(err => {
		console.error(err);
	})
};

window.dynamicDonate = () => {
	arkid.requestTransfer(network, 'safetransfer', 0, {contract:'arisen.token', symbol:'RSN', memo:'ramdeathtest', decimals:4}).then(function(result){
        console.log('result', result);
    })
};

window.fixedDonate = () => {
	arkid.requestTransfer(network, 'safetransfer', '1.0000', {contract:'arisen.token', symbol:'RSN', memo:'ramdeathtest', decimals:4}).then(function(result){
		console.log('result', result);
	})
};
