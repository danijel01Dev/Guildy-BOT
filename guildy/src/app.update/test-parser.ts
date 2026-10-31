
import { parseCharacters } from "./wow-char-parser";


const input = `
Garnaby 6.4 rog
Blitzboom 6.4 mm hunt
Rotmaw 6.6 unh dk
Mortaelis 6.5 unh dk
Mintez feral 6k - Bommi 6k
Mohthepala 5.4 ret - 5.2 heal
`;

const result = parseCharacters(input);

console.log("CHARACTERS:");
console.log(JSON.stringify(result.characters, null, 2));

console.log("\nUNRESOLVED:");
console.log(JSON.stringify(result.unresolved, null, 2));

console.log("\nSUMMARY:");
console.log("Characters:", new Set(result.characters.map(c => c.name)).size);
console.log("Recognized specs:", result.characters.length);
console.log("Unresolved:", result.unresolved.length);
