import A from '../../assets/illustrations/whale-in-the-sky.png';
import B from '../../assets/illustrations/ufo-and-fence.png';
import C from '../../assets/illustrations/lazy-whale.png';
import D from '../../assets/illustrations/whale-and-dog.png';

export const getPageNotFoundImage = (): string => {
  const variants: string[] = [A, B, C, D];
  const randomSeed = Math.random();
  return variants[Math.floor(randomSeed * variants.length)];
}
