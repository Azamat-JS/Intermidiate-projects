export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

export const addThousandsSeparator = (num) => {
    if(num == null || isNaN(num)) return "";

    const [integertPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integertPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart
       ? `${formattedInteger}.${fractionalPart}`
       : formattedInteger;
};