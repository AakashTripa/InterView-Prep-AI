import { GoogleGenAI } from "@google/genai";
import {conceptExplainPrompt, questionAnswerPrompt} from '../utils/prompts.js';
import dotenv from 'dotenv';
dotenv.config();
const ai = new GoogleGenAI({apiKey:process.env.GOOGLE_API_KEY});

export const generateInterviewQuestions=async(req,res)=>{
    
    try{
        //   console.log("Incoming data:", req.body);
        const {role, experience, topicsToFocus, numberOfQuestions}=req.body;
if(!role || !experience || !topicsToFocus || !numberOfQuestions){
    return res.status(400).json({message:"Missing Required fields"});
}

const prompt=questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        const response=await ai.models.generateContent({
            model:"gemini-2.0-flash-lite",
            contents:prompt,
        });
        let rawText=response.text;

        //clean it :Remove ```json and ```from beginning and end
        const cleanedText=rawText
        . replace(/^```json\s*/,"")  //remove starting ```json
        .replace(/```$/,"")   //remove ending ```
        .trim();

        //now safe to parse
        const data=JSON.parse(cleanedText);
        res.status(200).json(data);


    }catch(error){
        res.status(500).json({message:"Failed To genearte questions",error:error.message});
    }
}

export const generateConceptExplanation=async(req,res)=>{
    try{
        const {question}=req.body;
        if(!question){
            return res.status(400).json({message:"Missing Required fields"});
        }
        const prompt=conceptExplainPrompt(question);
        const response=await ai.models.generateContent({
             model:"gemini-2.0-flash-lite",
            contents:prompt,
        })
  let rawText=response.text;
const cleanedText=rawText
        . replace(/^```json\s*/,"")  //remove starting ```json
        .replace(/```$/,"")   //remove ending ```
        .trim();

        //now safe to parse
        const data=JSON.parse(cleanedText);

        res.status(200).json(data);
    }catch(error){
        res.status(500).json({message:"Server error",error:error.message});
    }
}
