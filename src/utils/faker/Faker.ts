import { DefinitionParser } from "./Parser";
import { GeneratorFactory } from "./Factory";

export type FakerConfig = {
  limit: number;
  columns: Record<string, string>;
};

export class FakerService {
  generate(config: FakerConfig): any[] {
    const result = [];

    for (let i = 0; i < config.limit; i++) {
      const row: Record<string, any> = {};

      for (const [key, value] of Object.entries(config.columns)) {
        const parsed = DefinitionParser.parse(value);
        const generator = GeneratorFactory.get(parsed.type);
        row[key] = generator.generate(parsed.args);
      }

      result.push(row);
    }

    return result;
  }
}

/*
    How to use:

    const faker = new FakerService();

    const data = faker.generate({
    limit: 15,
    columns: {
        a: "char[2]",
        b: "word",
        c: "string[2]",
        d: "date",
        e: "int(1,10)",
        f: "decimal(4,2)",
        g: "bool",
        h: "$(1000,5000)"
    }
    });

    console.log(data);

    where:

    "char[n]" -> char generator with n length
    "word" -> word generator
    "string[n]" -> string generator with n words
    "date" -> date generator
    "int(min,max)" -> int generator with min and max
    "decimal(intDigits,decimalDigits)" -> decimal generator with int digits and decimal digits
    "bool" -> bool generator
    "$(min,max)" -> currency generator with min and max

*/
