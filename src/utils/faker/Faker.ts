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