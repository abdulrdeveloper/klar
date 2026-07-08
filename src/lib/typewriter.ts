const TYPE_DELAY_MS = 4;

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export async function revealWords(
  text: string,
  onUpdate: (visibleText: string) => void,
  options?: { signal?: AbortSignal },
) {
  let visibleText = "";
  const words = text.match(/\S+\s*/g) ?? [text];

  const throwIfAborted = () => {
    if (options?.signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }
  };

  throwIfAborted();

  for (const word of words) {
    throwIfAborted();
    visibleText += word;
    onUpdate(visibleText);
    await sleep(TYPE_DELAY_MS);
    throwIfAborted();
  }
}
