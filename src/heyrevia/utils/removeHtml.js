export const removeHTMLTags = (input) => {
  return input.replace(/<\/?[^>]+(>|$)/g, ' ').trim();
}
