import { TokenGenerator } from "@4players/odin-tokens";

export const generateToken = (user) => {
    const accessKey = "AaCj64Fp5K1IH09OqzshY40D7f8/qP+hUaezXg79MGcr";
    const generator = new TokenGenerator(accessKey);
    const token = generator.createToken("asdfg1211", user);
    return token
}
