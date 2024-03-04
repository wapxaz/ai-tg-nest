import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiAiService {
  private genAI: GoogleGenerativeAI;
  constructor(private configService: ConfigService) {
    // Access your API key as an environment variable (see "Set up your API key" above)
    this.genAI = new GoogleGenerativeAI(
      this.configService.get('GEMINI_API_KEY'),
    );
  }

  async generateResponse(prompt: string) {
    // For text-only input, use the gemini-pro model
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
  }
}
