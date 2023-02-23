export const defaultInputs = (refs) => {
  refs.map(ref => ref.current.value = '');
}