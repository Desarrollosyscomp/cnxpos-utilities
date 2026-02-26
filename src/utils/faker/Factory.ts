import { BoolGenerator, CharGenerator, CurrencyGenerator, DateGenerator, DecimalGenerator, IntGenerator, StringGenerator, WordGenerator, type FakerGenerator } from "./Generators";

export class GeneratorFactory {
    static get(type: string): FakerGenerator {
      switch (type) {
        case "char": return new CharGenerator();
        case "word": return new WordGenerator();
        case "string": return new StringGenerator();
        case "date": return new DateGenerator();
        case "int": return new IntGenerator();
        case "decimal": return new DecimalGenerator();
        case "bool": return new BoolGenerator();
        case "$": return new CurrencyGenerator();
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    }
  }