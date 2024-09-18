import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const mathSafe = (content) => {
	const regexpStart = '<Math[^>]*>'
	const regexpEnd = '</Math[^>]*>'
	let converted = [];
	let unconverted = content;
	let mt = unconverted.match(regexpStart);
	while (!!mt) {
		let idx = mt.index;
		let s = mt[0];
		converted.push(unconverted.slice(0, idx));
		converted.push(s);
		unconverted = unconverted.slice(idx + s.length);
		mt = unconverted.match(regexpEnd);
		idx = mt.index;
		s = mt[0];
		let math = unconverted.slice(0, idx);
		math = math.replaceAll('_', '{:underscore:}');
		if (!math.match('String.raw')) {
			math = '{String.raw`' + math + '`}';
		}
		converted.push(math);
		converted.push(s);
		unconverted = unconverted.slice(idx + s.length);
		mt = unconverted.match(regexpStart);
	}
	converted.push(unconverted);
	return converted.join('');
}

const lineBreaks = (code) => {
	const spl = code.split('</script>');
	const script = spl[0] + '</script>';
	let postScript = spl.slice(1).join('</script>').replace(/^\s*[\r\n]/gm, "<br><br>");
	while (postScript.trim().slice(0, 4) === "<br>") {
		postScript = postScript.trim().slice(4);
	}
	while (postScript.trim().slice(postScript.length - 4) === "<br>") {
		postScript = postScript.trim().slice(0, postScript.length - 4)
	}
	return script + postScript
}

function customPP() {
	return {
		name: 'mathSafe',
		markup: ({ content, filename }) => {
			if (filename.search('src/sections') < 0) {
				return
			}
			let code = mathSafe(content);
			code = lineBreaks(code);
			return { code: code }
		}
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		customPP(),
		vitePreprocess()
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html'
		}),
        paths: {
            base: process.env.NODE_ENV === 'production' ? "/IMSE884" : "",
        },
	}
};

export default config;
