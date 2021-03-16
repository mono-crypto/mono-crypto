const esbuild = require('esbuild')

esbuild.build({
    entryPoints: ['./src/index.tsx'],
    bundle: true,
    outfile: './public/index.js',
    define: {
        'process.env.NODE_ENV': '"development"',
    },
    watch: {
        onRebuild(error, result) {
          if (error) console.error('watch build failed:', error)
          else console.error('watch build succeeded:', result)
        },
    },
}).then(result => {
    // Call "stop" on the result when you're done
    result.stop()
}).catch(() => process.exit(1))