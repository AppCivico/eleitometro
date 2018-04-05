// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parserOptions: {
		parser:
			'babel-eslint',
	},
	env: {
		browser: true,
	},
	// https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
	// consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
	extends: [
		'plugin:vue/essential',
		'airbnb-base',
	],
	// required to lint *.vue files
	plugins: [
		'vue',
	],
	globals: {
		cordova: true,
		DEV: true,
		PROD: true,
		__THEME: true,
	},
	// add your custom rules here
	rules: {
		// don't require .vue extension when importing
		'import/extensions': [
			'error',
			'always',
			{
				js:
					'never',
				vue:
					'never',
			},
		],
		// disallow reassignment of function parameters
		// disallow parameter object manipulation except for specific exclusions
		'no-param-reassign': [
			'error',
			{
				props: true,
				ignorePropertyModificationsFor: [
					'state', // for vuex state
					'acc', // for reduce accumulators
					'e', // for e.returnvalue
				],
			},
		],
		// allow paren-less arrow functions
		'arrow-parens': 0,
		'one-var': 0,
		'import/first': 0,
		'import/no-dynamic-require': 0,
		'import/no-unresolved': 0,
		'import/extensions': 0,
		'import/named': 2,
		'import/namespace': 2,
		'import/default': 2,
		'import/export': 2,
		// allow debugger during development
		'no-debugger':
			process
				.env
				.NODE_ENV ===
			'production'
				? 2
				: 0,
		'brace-style': [
			2,
			'stroustrup',
			{
				allowSingleLine: true,
			},
		],
		'no-tabs': 0,
		indent: [
			'error',
			'tab',
		],
	},
};
