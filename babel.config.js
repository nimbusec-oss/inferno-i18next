module.exports = function(api) {
	api.cache.using(() => process.env.NODE_ENV === 'development')

	const presets = [
		'@babel/preset-env'
	]
	const plugins = [
		['babel-plugin-inferno', {'imports': true}],
		'@babel/plugin-syntax-jsx',
		'@babel/plugin-proposal-class-properties'
	]

	return {
		presets,
		plugins
	}
}
