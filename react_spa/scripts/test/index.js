process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

require('@babel/register');
require('./test');
