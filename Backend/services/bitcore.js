var Client = require('bitcore-wallet-client');
var config = require('./bitcore.config')
var bip21 = require('bip21');
const receive = require('../models/m_receive');

exports.Createbitcore = function(name, callback) {
    var client = new Client({
        baseUrl: config.BWS_INSTANCE_URL
    });
    client.createWallet(name, name, 2, 2, { network: 'livenet' }, function(err, secret) {
        var clientt = new Client({
            baseUrl: config.BWS_INSTANCE_URL
        });
        clientt.joinWallet(secret, "Addlink", {}, function(err, wallet) {
            clientt.openWallet(function(err, ret) {
                callback(ret, JSON.parse(client.export()));
            });
        });
    });
}

exports.DataWallet = function(data, callback) {
    var client = new Client({
        baseUrl: config.BWS_INSTANCE_URL
    });
    client.import(JSON.stringify(data));
    client.openWallet(function(err, result) {
        callback(result);
    });
}

exports.CreateAddress = function(data, callback) {
    var client = new Client({
        baseUrl: config.BWS_INSTANCE_URL
    });
    client.import(JSON.stringify(data));
    client.openWallet(function (err, walllet) {
        client.createAddress(function (err, result) {
            receive.inserWallet_address(result.address, result.walletId);
            callback(result);
        });
    });
}


exports.GetAddress = function(data, callback) {
    var client = new Client({
        baseUrl: config.BWS_INSTANCE_URL
    });
    client.import(JSON.stringify(data));
    client.openWallet(function(err, walllet) {
        client.getMainAddresses({}, function(err, result) {
            callback(result);
        });
    });
}

exports.removetxid = function (data, callback) {
    var client = new Client({
        baseUrl: config.BWS_INSTANCE_URL,
        payProHttp: false
    });
    client.import(JSON.stringify(data));
    client.openWallet(function (err, walllet) {
        client.getTxProposals({}, function (err, result) {
            // client.removeTxProposal(result[0])
            // client.broadcastTxProposal(result[0],function(er,res){
            //     console.log(er,res);
            // })
            client.getTx('a7c18f67-beae-46c6-a067-218cf6c9e283',function(er,res){
                client.doNotVerifyPayPro = true;
                client.payProHttp = false;
                // console.log(client);
                console.log(res);
                client.broadcastTxProposal(res[0],function(err,ress){
                    console.log(err,res);
                });
            });
            callback(result);
        });
    });
}

exports.GetBalance = function (data, callback) {
    var client = new Client({
        baseUrl: config.BWS_INSTANCE_URL
    });
    client.import(JSON.stringify(data));
    client.openWallet(function(err, walllet) {
        client.getBalance(function(err, result) {
            callback(result);
        });
    });
}

exports.gethisaddress = function(data, address, callback) {
    var client = new Client({
        baseUrl: config.BWS_INSTANCE_URL
    });
    client.import(JSON.stringify(data));
    client.openWallet(function() {
        client.getUtxos({ addresses: [address] }, function(er, res) {
            callback(res)
        });
    });
}

exports.getHistory = function(data, callback) {
    var client = new Client({
        baseUrl: config.BWS_INSTANCE_URL
    });
    client.import(JSON.stringify(data));
    client.openWallet(function() {
        client.getTxHistory({}, function(er, res) {
            callback(res)
        });
    });
}

exports.sendBitcoin = function (data, address, amount, message, callback) {
    var client = new Client({
        baseUrl: config.BWS_INSTANCE_URL
    });
    client.import(JSON.stringify(data));
    client.openWallet(function () {
        let opts = {
            outputs: [{
                amount: 71875000,
                toAddress: address,
            }],
            message: message
        };
        client.createTxProposal(opts, function (er1, txp) {
            client.publishTxProposal({ txp: txp }, function (er2, res) {
                console.log(res);
                callback(er2, res)
                // client.signTxProposal(res, function (err, ress) {
                //     console.log(ress);
                //     // client.broadcastTxProposal(ress, function (errr, resss) {
                //     //     callback(errr, resss)
                //     // });
                // })
            });
        });
    });
}


exports.bitcoinURL = function(address, amount, message) {
    let go = bip21.encode(address, {
        amount: amount,
        message: message
    });
    return go;
}