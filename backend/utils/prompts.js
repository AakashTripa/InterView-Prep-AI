export const questionAnswerPrompt=(role,experience,topicsToFocus,numberOfQuestions)=>(
    `You are an AI trained to generate technical   interview questions and answers.
    Task:
    -Role:${role}
    -candidate Experience:${experience} years
    -Focus Topics:${topicsToFocus}
    -write :${numberOfQuestions} interview questions
    -For each question genearte a detailed but beginner-friendly answer.
    -If the answer needs a code example, add a small code block inside.
    -Return a pure JSON array like:
    [
        {
            question:"Question here?",
            answer:"Answer here"
        },
       ...
    ]
       Important :Do Not add any extra text. Only return valid JSON.
    `
)


export const conceptExplainPrompt=(question)=>(
    `
    You are an AI trained to generate explanaintions for a given interview question.

    Task:
    -Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
    -Question:${question}
    -After the explaination,provide a short and clear title that summarize the concept for the article or page header.
      -Keep the formatting very clean and clear.
      -Return the result as a valid JSON object in the following format:
      {
        title:"short title here?",
        explaination:"Explaination here."
      } 
    
    Important :Do Not add any extra text outside the JSON. Only return valid JSON.
    `
)