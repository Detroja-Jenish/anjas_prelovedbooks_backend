import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

export class GeminiController {
    static genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEYS!);
    static model = this.genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL! });
    static fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEYS!);


    static getDetail = async (filePath: string, mimeType: string) => {
        const uploadResponse = await this.fileManager.uploadFile(filePath, {
            mimeType: mimeType,
            displayName: "book",
        });
        console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);
        // const prompt = ` give detail about book :- Fairy Poppy's Magic Wish`
        // const prompt = `give detail about this book like BookName,Author,Illustrator,Publisher,ISBN in json format `
        // const prompt = `give BookName `
        const prompt = 'List details for uploaded image of book by getting from multiple resource with this schema genrate discription about 150 charachetrs and asign categoryIds from these category list [{"id":"0-to-1-Year-Old","categoryName":"0 to 1 Year Old"},{"id":"1-to-2-Years-Old","categoryName":"1 to 2 Years Old"},{"id":"10-15-Year-Olds","categoryName":"10-15 Year Olds"},{"id":"2-to-4-Year-Olds","categoryName":"2 to 4 Year Olds"},{"id":"3D/Pop-Up-Books","categoryName":"3D/Pop Up Books"},{"id":"4-to-6-Year-Olds","categoryName":"4 to 6 Year Olds"},{"id":"6-to-8-Year-Olds","categoryName":"6 to 8 Year Olds"},{"id":"8-10-Year-Olds","categoryName":"8-10 Year Olds"},{"id":"Activity/Interactive-Books","categoryName":"Activity/Interactive Books"},{"id":"Art/Drawing/Colouring-Books","categoryName":"Art/Drawing/Colouring Books"},{"id":"Baby-Shark-Series","categoryName":"Baby Shark Series"},{"id":"Barbie","categoryName":"Barbie"},{"id":"Batman","categoryName":"Batman"},{"id":"Bedtime-Story-Books","categoryName":"Bedtime Story Books"},{"id":"Behaviour-Books","categoryName":"Behaviour Books"},{"id":"Board-Books","categoryName":"Board Books"},{"id":"Boosts-Imagination-and-Creativity","categoryName":"Boosts Imagination and Creativity"},{"id":"Chapter-Books","categoryName":"Chapter Books"},{"id":"Christmas-Stories","categoryName":"Christmas Stories"},{"id":"Comic-Books","categoryName":"Comic Books"},{"id":"Disney","categoryName":"Disney"},{"id":"Disney-Princess","categoryName":"Disney Princess"},{"id":"Emotions","categoryName":"Emotions"},{"id":"Fairy-Tales","categoryName":"Fairy Tales"},{"id":"Family-Relations","categoryName":"Family Relations"},{"id":"Farmyard-Tales","categoryName":"Farmyard Tales"},{"id":"Flip-Flap/Lift-and-Look-Books","categoryName":"Flip Flap/Lift and Look Books"},{"id":"Friendship","categoryName":"Friendship"},{"id":"Fun","categoryName":"Fun"},{"id":"Habit-and-Routine-Development","categoryName":"Habit and Routine Development"},{"id":"Hardcover-Books","categoryName":"Hardcover Books"},{"id":"Harry-Potter-Books","categoryName":"Harry Potter Books"},{"id":"Igloo","categoryName":"Igloo"},{"id":"Little-Princess-Series","categoryName":"Little Princess Series"},{"id":"Mega-Sized-Books","categoryName":"Mega Sized Books"},{"id":"Morals-and-Values","categoryName":"Morals and Values"},{"id":"Mummy-and-Baby","categoryName":"Mummy and Baby"},{"id":"Overcoming-Fears","categoryName":"Overcoming Fears"},{"id":"Paperback-Books","categoryName":"Paperback Books"},{"id":"Paw-Patrol","categoryName":"Paw Patrol"},{"id":"Peppa-Pig-Book-Series","categoryName":"Peppa Pig Book Series"},{"id":"Peter-Rabbit","categoryName":"Peter Rabbit"},{"id":"Phonics-Books/Early-Reading","categoryName":"Phonics Books/Early Reading"},{"id":"Picture-Story-Books","categoryName":"Picture Story Books"},{"id":"Potty-Training","categoryName":"Potty Training"},{"id":"Puppet-Books","categoryName":"Puppet Books"},{"id":"Push-Pull-Slide","categoryName":"Push Pull Slide"},{"id":"Puzzle-Books","categoryName":"Puzzle Books"},{"id":"Rhyme-Books","categoryName":"Rhyme Books"},{"id":"Search-and-Find-Books","categoryName":"Search and Find Books"},{"id":"Self-Acceptance-and-Self-Love","categoryName":"Self Acceptance and Self Love"},{"id":"Sing-Along-Books","categoryName":"Sing Along Books"},{"id":"Sound-Books","categoryName":"Sound Books"},{"id":"Sticker-Books","categoryName":"Sticker Books"},{"id":"Survival-Skills","categoryName":"Survival Skills"},{"id":"Thomas-and-Friends","categoryName":"Thomas and Friends"},{"id":"Touch-and-Feel-Books","categoryName":"Touch and Feel Books"},{"id":"Under-129/-","categoryName":"Under 129/-"},{"id":"Under-149/-","categoryName":"Under 149/-"},{"id":"Under-49/-","categoryName":"Under 49/-"},{"id":"Under-79/-","categoryName":"Under 79/-"},{"id":"Under-99/-","categoryName":"Under 99/-"},{"id":"Usborne","categoryName":"Usborne"},{"id":"Winnie-The-Pooh","categoryName":"Winnie The Pooh"}]: { "BookName": str, "Author": str, "Publisher": str, "Description":str, "ResalePrice" : number, CategoryIds: number[]}'
        // const prompt = `book details with this schema:
        // {
        // "BookName":str,
        // "Author":str,
        // "Illustrator":str,
        // "Publisher":str,
        // "ISBN":str
        // }`
        const result = await this.model.generateContent([
            {
                fileData: {
                    mimeType: uploadResponse.file.mimeType,
                    fileUri: uploadResponse.file.uri,
                }
            },
            { text: prompt },
        ]);

        // const result = await model.generateContent(prompt);
        const response = result.response;
        // const bookName = response.text();
        // const bookData = await model.generateContent([

        //     {
        //         text: `book detail of "${bookName}" with schema : {"BookName":str,"Author":str,"Illustrator":str,"Publisher":str,"ISBN":str}`
        //     },
        // ]);
        // console.log(bookName);
        const text = response.text()
        console.log(text);

        return text
    }
}