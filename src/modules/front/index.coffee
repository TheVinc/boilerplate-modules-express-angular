fs = require 'fs'
express = require 'express'
Path = require 'path'

module.exports = () ->
	@app.use(express.static(Path.resolve(__dirname + '/public')));

	# Front webservice. Must be called last
	@app.get /.*/, (req, res, next) ->
		res.sendFile Path.resolve __dirname + '/public/index.html'
	# @app.get /(.*)/, (req, res, next) ->
	# 	fs.stat __dirname + '/public' + req.params[0], (err, stats) ->
	# 		# console.log err if err
	# 		if stats?.isFile()
	# 			next()
	# 		else
	# 			fs.readFile __dirname + '/public/index.html', {encoding: 'UTF-8'}, (err, content) ->
	# 				# console.log err if err
	# 				return res.status(500).send('Server error') if err
	# 				res.status(200).send(content)
	# , express.static(__dirname + '/public')
