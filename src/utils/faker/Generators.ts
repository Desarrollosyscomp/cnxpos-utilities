import { RandomUtil } from "./RandomUtil";

function requireArg(args: number[], index: number, name: string): number {
    const value = args[index];
  
    if (value === undefined) {
      throw new Error(`Missing argument ${index} for ${name}`);
    }
  
    return value;
  }

export interface FakerGenerator {
  generate(args: number[]): any;
}

export class CharGenerator implements FakerGenerator {
    generate(args: number[]): string {
      const length = requireArg(args, 0, "char");
  
      return Array.from({ length }, () =>
        RandomUtil.randomChar()
      ).join("");
    }
  }

export class WordGenerator implements FakerGenerator {
  generate(): string {
    return RandomUtil.randomWord();
  }
}

export class StringGenerator implements FakerGenerator {
    generate(args: number[]): string {
      const count = requireArg(args, 0, "string");
  
      return Array.from({ length: count }, () =>
        RandomUtil.randomWord()
      ).join(" ");
    }
  }
  
export class DateGenerator implements FakerGenerator {
  generate(): string {
    return new Date().toISOString();
  }
}

export class IntGenerator implements FakerGenerator {
    generate(args: number[]): number {
      const min = requireArg(args, 0, "int");
      const max = requireArg(args, 1, "int");
  
      return RandomUtil.int(min, max);
    }
  }
  export class DecimalGenerator implements FakerGenerator {
    generate(args: number[]): string {
      const intDigits = requireArg(args, 0, "decimal");
      const decimalDigits = requireArg(args, 1, "decimal");
  
      const intPart = RandomUtil.int(
        10 ** (intDigits - 1),
        10 ** intDigits - 1
      );
  
      const decimalPart = RandomUtil.int(
        0,
        10 ** decimalDigits - 1
      )
        .toString()
        .padStart(decimalDigits, "0");
  
      return `${intPart}.${decimalPart}`;
    }
  }

export class BoolGenerator implements FakerGenerator {
  generate(): boolean {
    return Math.random() > 0.5;
  }
}

export class CurrencyGenerator implements FakerGenerator {
    generate(args: number[]): string {
      const min = requireArg(args, 0, "$");
      const max = requireArg(args, 1, "$");
  
      const value = RandomUtil.int(min, max);
  
      const formatted = value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
      const decimals = RandomUtil.int(0, 99)
        .toString()
        .padStart(2, "0");
  
      return `$${formatted},${decimals}`;
    }
  }