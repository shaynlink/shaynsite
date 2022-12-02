import { createContext, useState, useRef, useEffect } from 'react';
import rosetta from 'rosetta';

const i18n = rosetta();

export const defaultLanguage = 'en';
export const languages = ['en', 'fr'];
export interface ContentLanguageMap {
    [key: string]: string
}
export const contentLanguageMap: ContentLanguageMap = { en: 'en-US', fr: 'fr-FR' };

interface InfinityObject {
    [key: string]: InfinityObject | string;
}

export type I18nWrapper = {
    activeLocale: string;
    t: (key: string, params?: any, lang?: any) => string;
    locale: (l: string, dict?: InfinityObject) => void;
}

export const I18nContext = createContext<Partial<I18nWrapper>>({});

i18n.locale(defaultLanguage);

interface I18nArgs {
    children: React.ReactNode;
    locale: string;
    lngDict: { [key: string]: string }
}

export default function I18n({ children, locale, lngDict }: I18nArgs) {
    const activeLocaleRef = useRef(locale || defaultLanguage);
    const [, setTick] = useState(0);
    const firstRender = useRef(true);

    const i18nWrapper: I18nWrapper = {
        activeLocale: activeLocaleRef.current,
        t: (...args) => i18n.t(...args),
        locale: (l, dict) => {
            i18n.locale(l);
            activeLocaleRef.current = l;
            if (dict) {
                i18n.set(l, dict);
            }
            // force rerender to update view
            setTick((tick) => tick + 1);
        }
    }

    // for initial SSR render
    if (locale && firstRender.current == true) {
        firstRender.current = false;
        i18nWrapper.locale(locale, lngDict);
    }

    // When locale is updated
    useEffect(() => {
        if (locale) {
            i18nWrapper.locale(locale, lngDict);
        }
    }, [lngDict, locale]);

    return (
        <I18nContext.Provider value={i18nWrapper}>{children}</I18nContext.Provider>
    )   
}
