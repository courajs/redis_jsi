#!/usr/bin/env node

var async = require('async');
var redis = require('redis');
var repl = require('repl');


var client = redis.createClient();
result = {};

client.keys('*', function(error, keys){
	var i;
	if (error) return err(error);
	for (i in keys){
		var key = keys[i];
		result[key] = {};
	}
	async.each(keys, process_key, function(error){
		console.log('The redis object has been stored in the "result" variable');
		repl.start({useGlobal: true});
	})
});


function process_key(key, cb){
	client.type(key, function(error, type){
		if(error) return cb(error);
		process_key_of_type(key, type, cb);
	});
}

function process_key_of_type(key, type, cb){
	if (type === 'string') return process_string(key, cb);
	if (type === 'hash') return process_hash(key, cb);
}

function process_string(key, cb){
	client.get(key, function(error, value){
		if (error) return cb(error);

		if (is_a_reference(value)){
			result[key] = result[value];
		} else {
			result[key] = value;
		}
		cb();
	})
}

function process_hash(key, cb){
	client.hgetall(key, function(error, hash_obj){
		var v,k;
		if(error) return cb(error);

		for (k in hash_obj){
			v = hash_obj[k];

			if(is_a_reference(v)){
				result[key][k] = result[v];
			} else {
				result[key][k] = v;
			}
		}
		cb();
	})
}



function is_a_reference(maybe_key){
	return !! result[maybe_key];
}


function err(error){
	console.error(error);
}