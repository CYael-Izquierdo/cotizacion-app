export const getYearDifference = year => {
    return new Date().getFullYear() - year;
}

export const getBrandIncrement = brand => {
    let increment;

    switch (brand) {
        case "americano":
            increment = .15
            break;
        case "europeo":
            increment = .3
            break;
        case "asiatico":
            increment = .05
            break;
        default:
            break
    }

    return increment;
}

export const getPlanIncrement = plan => {
    let increment;

    switch (plan) {
        case "basico":
            increment = .2;
            break;
        case "completo":
            increment = .5
            break;
        default:
            break;
    }

    return increment;
}

export const capitalize = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}