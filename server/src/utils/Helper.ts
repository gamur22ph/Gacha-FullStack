
export const getIdentifierType = (input: string) => {
    // Clean the input (trim whitespace)
    let identifier = input.trim();

    // 2. A standard email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 3. Determine the type
    let identityType;
    if (emailRegex.test(identifier)) {
        identityType = 'email';
        identifier = identifier.toLowerCase(); // Standardize email casing
    } else {
        identityType = 'username_canonical';
        identifier = identifier.toLowerCase();
    }

    // Fallback to username
    return { identifierType: identityType, identifierValue: identifier };
}