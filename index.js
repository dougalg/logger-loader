/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Dougal Graham @dougalg
*/
var loaderUtils = require("loader-utils");
var SourceNode = require("source-map").SourceNode;
var SourceMapConsumer = require("source-map").SourceMapConsumer;
var HEADER = "\n/*** WRAPPING FROM logger-loader ***/\n";
module.exports = function(content, sourceMap) {
	if(this.cacheable) this.cacheable();
	var query = loaderUtils.parseQuery(this.query);

	var loggerModule = JSON.stringify(query.module);
	var loggerModuleName = JSON.stringify(query.importName) || 'wpLogError';

	if (loggerModule) {
		var prefix = "try {\n";
		var postfix = "\n} catch (e) {\n\tvar "+ loggerModuleName +" = require("+ loggerModule +");\n\t"+ loggerModuleName +"(e);\n}";

		if(sourceMap) {
			var currentRequest = loaderUtils.getCurrentRequest(this);
			var node = SourceNode.fromStringWithSourceMap(content, new SourceMapConsumer(sourceMap));
			node.prepend(prefix);
			node.add(postfix);
			var result = node.toStringWithSourceMap({
				file: currentRequest
			});
			this.callback(null, result.code, result.map.toJSON());
			return;
		}
		return prefix + content + postfix;
	}
	else {
		return content;
	}
}
