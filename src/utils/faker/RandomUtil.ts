export class RandomUtil {
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
}
