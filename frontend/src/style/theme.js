const color = {
    main: "#3cb371",
    darkerMain: "#0D8541",
    brighterMain: "#90E0B3",
    neonGreen: "#10E56D",
    red: "#FB7754",
    orange: "#FBAD54",
    blue: "#3a7e9f",
    black: "#404040",
    grey: "#c9c9c9",
};

const fontSize = {
    xs: "0.5rem",
    sm: "0.75rem",
    base: "1rem",
    md: "1.25rem",
    lg: "1.5rem",
};

const buttonTheme = {
    smButton: {
        font: fontSize.sm,
        height: "32px",
        padding: "16px 0",
    },
    mdButton: {
        font: fontSize.base,
        height: "44px",
        padding: "24px 0",
    },
    lgButton: {
        font: fontSize.lg,
        height: "52px",
        padding: "0 32px",
    },
};

const theme = { color, fontSize, buttonTheme };

export default theme;
