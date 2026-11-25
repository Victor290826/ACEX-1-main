const basePath = window.location.pathname.includes('/minicursos/') ||
                 window.location.pathname.includes('/ebooks/') ||
                 window.location.pathname.includes('/sobre-nos/')
    ? '..'
    : '.';

export const themes = {
    light: {
        logo: `${basePath}/assets/imgs/logo-light.svg`,
        icon: "<i class='fa-solid fa-moon'></i>",
        logoFooter: `${basePath}/assets/imgs/somente_nome_claro.svg`,
        logoIfba: `${basePath}/assets/imgs/logo-ifba.png`,
    },

    dark: {
        logo: `${basePath}/assets/imgs/logo-dark.svg`,
        icon: "<i class='fa-solid fa-sun color-primary'></i>",
        logoFooter: `${basePath}/assets/imgs/somente_nome_escuro.svg`,
        logoIfba: `${basePath}/assets/imgs/logo-ifba-branca.png`,
    }
};