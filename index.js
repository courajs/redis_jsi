var async = require('async');
var redis = require('redis');

var guid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

var client = redis.createClient();

client.keys('*', function(error, keys){
	if (error) return err(error);
});


function get_entry_points(keys){
	return keys.filter(function(item){
		return !guid.test(item);
	});
}

function get_hashes(keys){
	return keys.filter(function(item){
		return guid.test(item);
	})
}

function err(error){
	console.error(error);
}