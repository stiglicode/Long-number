import States from "./interface/state.interface";
// const shortCutNumber = (number) => {
//     const stringNumber = number.toString();
//     if(number > 999 && number <= 9999) {
//         if(stringNumber[1] >= 1) {
//             return `${stringNumber.substr(0, 1)},${stringNumber.substr(1, 1)}k`
//         }else {
//             return `${stringNumber.substr(0, 1)}k`
//         }
//     } else if(number > 9999 && number <= 99999) {
//         if(stringNumber[2] >= 1) {
//             return `${stringNumber.substr(0, 2)},${stringNumber.substr(2, 1)}k`
//         }
//         else {
//             return `${stringNumber.substr(0, 2)}k`
//         }
//     } else if(number > 99999 && number <= 999999) {
//         if(stringNumber[3] >= 1) {
//             return `${stringNumber.substr(0, 3)},${stringNumber.substr(3, 1)}k`
//         }
//         else {
//             return `${stringNumber.substr(0, 3)}k`
//         }
//     } else if(number < 999) {
//         return stringNumber;
//     }
// }
class LongNumberShort implements States {
	_longNumber: string;
	_numberSuffix: {
		bilionSK: string;
		bilionEN: string;
		milion: string;
		thousand: string;
	};
	// Constructor
	constructor() {
		this._longNumber;
		this._numberSuffix = {
			bilionSK: "mld",
			bilionEN: "b",
			milion: "m",
			thousand: "k",
		};
	}
	// Methods
	numberInput(num: number) {
		if (typeof num === "number") {
			this._longNumber = num.toString();
		} else {
			this._longNumber = num;
		}
		return this._longNumber;
	}
}
const LNS = new LongNumberShort();

console.log(LNS.numberInput(4));
