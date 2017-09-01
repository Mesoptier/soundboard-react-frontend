import { css, fontFace } from 'glamor';

export const fontNormal = fontFace({
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: 400,
    src: "local('Karla'), local('Karla-Regular'), url(https://fonts.gstatic.com/s/karla/v5/Zi_e6rBgGqv33BWF8WTq8g.woff2) format('woff2')",
    unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215',
});

export const fontBold = fontFace({
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: 700,
    src: "local('Karla Bold'), local('Karla-Bold'), url(https://fonts.gstatic.com/s/karla/v5/suoMYBGv5sGCUIrF9mVTffesZW2xOQ-xsNqO47m55DA.woff2) format('woff2')",
    unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215',
});

css.global('html, body', {
    margin: 0,
    fontFamily: fontNormal,
    fontSize: 16,
});
