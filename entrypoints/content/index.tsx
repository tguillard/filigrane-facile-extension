import './style.css';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {i18nConfig} from "@/components/i18nConfig.ts";
import initTranslations from "@/components/i18n.ts";
import {ThemeProvider} from "@/components/theme-provider.tsx";

export default defineContentScript({
    matches: ['*://*/*'],
    cssInjectionMode: 'ui',
    async main(ctx) {
        if (!window.location.hostname.includes('api.filigrane.beta.gouv.fr')) {
            console.log("Script non activé : Domaine non autorisé.");
            return; // Arrête l'exécution si le domaine n'est pas contoso.com
        }
        initTranslations(i18nConfig.defaultLocale, ["common", "content"])
        const ui = await createShadowRootUi(ctx, {
            name: 'language-learning-content-box',
            position: 'inline',
            onMount: (container) => {
                console.log(container);
                const root = ReactDOM.createRoot(container);
                root.render(
                    <ThemeProvider>
                        <App/>
                    </ThemeProvider>
                );
                return root;
            },
            onRemove: (root) => {
                root?.unmount();
            },
        });

        ui.mount();
    },
});
