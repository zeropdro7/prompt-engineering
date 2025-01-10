import { removeHTMLTags } from "../utils/removeHtml";

export const code = async ({inputAnswers}) => {
  const outputAnswers = inputAnswers
    .map(input => ({
      id: input.id,
      label: input.label,
      answer: removeHTMLTags(input.answer),
  }));
  
  return {
    success: true,
    outputAnswers
  };
};
