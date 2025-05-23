import bcrypt from 'bcryptjs';


/**
 * hash password
 * @param password
 * @returns string
 */
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

/**
 * compare password
 * @param password
 * @param hash
 * @returns boolean 
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
}