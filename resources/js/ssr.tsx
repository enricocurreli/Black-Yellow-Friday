import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { RouteName } from 'ziggy-js';
import { route } from '../../vendor/tightenco/ziggy/src/js';

const appName = 'BlackWave';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.tsx`,
                import.meta.glob('./Pages/**/*.tsx'),
            ),
        setup: ({ App, props }) => {
            /* eslint-disable */
            // @ts-expect-error
            global.route<RouteName> = (name, params, absolute) => {
                const ziggy = page.props.ziggy;
                
                if (!ziggy) {
                    console.error('Ziggy is undefined. Check server-side configuration.');
                    return null;
                }

                return route(name, params as any, absolute, {
                    ...ziggy,
                    location: new URL(ziggy.location),
                });
            };
            /* eslint-enable */

            return <App {...props} />;
        },
    }),
);
