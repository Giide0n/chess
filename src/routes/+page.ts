// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

import init from 'rust';

console.log(init);

// init().then(() => {
// 	console.log('init done');
// });
