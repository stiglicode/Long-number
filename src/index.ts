/* eslint-disable indent */
interface NumSuffix {
	thousand: string;
	milion: string;
	bilion: string;
}
interface NumberRange {
	zero: number;
	one: number;
	ten: number;
	hundred: number;
}
interface NumberRangeContainer {
	thousand: NumberRange;
	milion: NumberRange;
	bilion: NumberRange;
}
class LongNumberShort {
	private _longNumber: {
		strigify: string;
		numify: number;
	};
	private _longNumber_Array: number[];
	private _shortCut: string | number | boolean;
	private _numberSuffix: {
		SK: NumSuffix;
		CZ: NumSuffix;
		EN: NumSuffix;
	};
	private _lang: string;
	public origin: number | number[];
	private _numberRange: NumberRangeContainer;
	// Constructor
	constructor(number: number[] | number | string) {
		this._lang = "en";
		if (typeof number === "string" || typeof number === "number") {
			this._longNumber = {
				strigify: typeof number === "number" ? number.toString() : number,
				numify: typeof number === "string" ? +number : number,
			};
		} else {
			this._longNumber_Array = number;
		}
		this._shortCut;
		this._numberSuffix = {
			SK: {
				thousand: " tis",
				milion: " mil",
				bilion: " mld",
			},
			CZ: {
				thousand: " tis",
				milion: " mil",
				bilion: " mld",
			},
			EN: {
				thousand: "k",
				milion: "m",
				bilion: "b",
			},
		};
		this._numberRange = {
			thousand: {
				zero: 999,
				one: 9999,
				ten: 99999,
				hundred: 999999,
			},
			milion: {
				zero: 999999,
				one: 9999999,
				ten: 99999999,
				hundred: 999999999,
			},
			bilion: {
				zero: 999999999,
				one: 9999999999,
				ten: 99999999999,
				hundred: 999999999999,
			},
		};
		this.origin =
			typeof number === "string" || typeof number === "number"
				? this._longNumber.numify
				: this._longNumber_Array;
	} // Numbers methods
	// ------------------------
	private _shortCutter(
		range: NumberRange,
		lang: string,
		numNumber: number,
		numString: string
	): string | boolean {
		if (numNumber > range.zero && numNumber <= range.hundred) {
			// 1000 - 10 000
			if (numNumber > range.zero && numNumber <= range.one) {
				if (+numString[1] >= 1) {
					return `${numString.substr(0, 1)},${numString.substr(1, 1)}${lang}`;
				} else {
					return `${numString.substr(0, 1)}${lang}`;
				}
			}
			// 10 000 - 100 000
			else if (numNumber > range.one && numNumber <= range.ten) {
				if (+numString[2] >= 1) {
					return `${numString.substr(0, 2)},${numString.substr(2, 1)}${lang}`;
				} else {
					return `${numString.substr(0, 2)}${lang}`;
				}
			}
			// 100 000 - 1 000 000
			else if (numNumber > range.ten && numNumber <= range.hundred) {
				if (+numString[3] >= 1) {
					return `${numString.substr(0, 3)},${numString.substr(3, 1)}${lang}`;
				} else {
					return `${numString.substr(0, 3)}${lang}`;
				}
			}
		} else return false;
	}
	// Methods
	// ------------------------
	private nextShortCut(inputNumber: number): string | number | boolean {
		if (
			!this._shortCutter(
				this._numberRange.thousand,
				this.setLang().thousand,
				inputNumber,
				inputNumber.toString()
			)
		) {
			if (
				!this._shortCutter(
					this._numberRange.milion,
					this.setLang().milion,
					inputNumber,
					inputNumber.toString()
				)
			) {
				if (
					!this._shortCutter(
						this._numberRange.bilion,
						this.setLang().bilion,
						inputNumber,
						inputNumber.toString()
					)
				) {
					return false;
				} else
					return (this._shortCut = this._shortCutter(
						this._numberRange.bilion,
						this.setLang().bilion,
						inputNumber,
						inputNumber.toString()
					));
			} else
				return (this._shortCut = this._shortCutter(
					this._numberRange.milion,
					this.setLang().milion,
					inputNumber,
					inputNumber.toString()
				));
		} else
			return (this._shortCut = this._shortCutter(
				this._numberRange.thousand,
				this.setLang().thousand,
				inputNumber,
				inputNumber.toString()
			));
	}
	// Input
	public cut(): number | string | boolean {
		if (this.nextShortCut(this._longNumber.numify) === false) {
			return this._longNumber.numify;
		} else {
			return this._shortCut;
		}
	}
	public cutArray() {
		// eslint-disable-next-line
		var finalArr: any[] = [];
		this._longNumber_Array.forEach((arr: number) => {
			if (this.nextShortCut(arr) === false) {
				return this._longNumber_Array;
			} else {
				finalArr.push(this.nextShortCut(arr));
			}
		});
		return finalArr;
	}
	// Config
	public langConfig(lang = "en") {
		this._lang = lang;
		return {
			origin: this.origin,
			cut: (): string | number | boolean => {
				return this.cut();
			},
			cutArray: () => {
				return this.cutArray();
			},
		};
	}
	// Utilities
	private setLang() {
		switch (this._lang) {
			case "sk" || "SK" || "cz-sk":
				return this._numberSuffix.SK;
			case "cz" || "CZ" || "sk-cz":
				return this._numberSuffix.CZ;
			case "en" || "EN":
				return this._numberSuffix.EN;
			default:
				return this._numberSuffix.EN;
		}
	}
}
const LNS = (num: number | string | number[]) => {
	return new LongNumberShort(num);
};
// const short = LNS([4414, 877414418, 46484545445]).langConfig("sk");
const short = LNS(441444156).langConfig("sk");

// short.langConfig();

console.log({ origin: short.origin });
console.log({ cut: short.cut() });
// console.log({ cut: short.cutArray() });
