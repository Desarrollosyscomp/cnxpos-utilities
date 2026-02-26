export type ParsedDefinition = {
  type: string;
  args: number[];
};

export class DefinitionParser {
  static parse(def: string): ParsedDefinition {
    const match = def.match(/^([a-zA-Z$]+)(?:[\[(]([\d,]+)[\])])?$/);

    if (!match) throw new Error(`Invalid definition: ${def}`);

    const type = match[1]!;
    const args = match[2] ? match[2].split(",").map(Number) : [];

    return { type, args };
  }
}
