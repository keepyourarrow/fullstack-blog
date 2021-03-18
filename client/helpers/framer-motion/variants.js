export const fadeVariant = (property, initial, animate) => {
    return {
        initial: {
            opacity: 0,
            [property]: initial,
        },
        animate: { opacity: 1, [property]: animate },
        exit: { opacity: 0, [property]: initial },
    };
};
