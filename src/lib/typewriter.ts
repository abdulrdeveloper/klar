const TYPE_DELAY_MS = 24;

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export async function revealWords(
  text: string,
  onUpdate: (visibleText: string) => void,
) {
  let visibleText = "";
  const words = text.match(/\S+\s*/g) ?? [text];

  for (const word of words) {
    visibleText += word;
    onUpdate(visibleText);
    await sleep(TYPE_DELAY_MS);
  }
}
