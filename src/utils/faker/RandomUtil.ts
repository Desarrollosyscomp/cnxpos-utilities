export class RandomUtil {
    static paragraphs: string[][] = [
        `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nulla eget ex sed sem porttitor consequat.
        Etiam quis elementum mauris.
        Sed eu dictum urna, eu volutpat quam.
        `,
        `
        Maecenas consectetur id orci quis vestibulum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nam facilisis ornare mi ac iaculis.
        Nunc suscipit eget mi at tincidunt.
        `,
        `
        Proin mi neque, condimentum sed lorem ac, rutrum sollicitudin massa.
        Etiam mattis quis dui ut sollicitudin.
        Aliquam erat volutpat.
        Donec interdum facilisis elementum.
        Nullam urna libero, vulputate non nulla at, facilisis placerat mauris.
        `
      ].map(p =>
        p
          .replace(/[.,]/g, "")
          .split(/\s+/)
          .filter(Boolean)
      );
  static int(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static randomChar(): string {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const index = this.int(0, chars.length - 1);
    return chars.charAt(index);
  }

  static randomWord(): string {
    const words = [
      "Hola", "Mundo", "Lorem", "Ipsum", "Dolor",
      "Producto", "Azul", "Rápido", "Sol", "Nube",
    ];
  
    const index = this.int(0, words.length - 1);
    return words[index]!;
  }

  static sequentialWords(count: number): string[] {
    const paragraphIndex = this.int(0, this.paragraphs.length - 1);
    const words = this.paragraphs[paragraphIndex]!;
  
    const result: string[] = [];
  
    for (let i = 0; i < count; i++) {
      const index = i % words.length;
      result.push(words[index]!);
    }
  
    return result;
  }
}
