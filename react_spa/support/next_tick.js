export default async function nextTick(ticks=1) {
  for( let i=ticks; i--; )
    await new Promise(r => setTimeout(r, 0));
}
