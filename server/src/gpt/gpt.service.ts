import { Injectable } from '@nestjs/common';
import { CreateGptDto } from './dto/create-gpt.dto';
import { Configuration, OpenAIApi } from 'openai';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class GptService {
  // GPT
  // private readonly gpt: OpenAIApi;

  // Configuration
  configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  openai = new OpenAIApi(this.configuration);

  // Question
  async question(user: UserEntity, gpt: CreateGptDto) {
    // Config Error
    if (!this.configuration.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Input Error
    if (gpt.techStack.trim().length === 0) {
      throw new Error('Please enter a valid tech stack');
    }

    // Generate Question
    try {
      const completion = await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt: generatePrompt(gpt.techStack),
        temperature: 0.6,
      });
      return { result: completion.data.choices[0].text };

      // Error handle
    } catch (error) {
      // console.error(error);
      if (error.response) {
        throw new Error(error.response.data);
      } else {
        throw new Error('An error occurred during your request');
      }
    }
  }

  answer() {
    return `This action returns all gpt`;
  }
}

function generatePrompt(techStack) {
  const capitalizedAnimal =
    techStack[0].toUpperCase() + techStack.slice(1).toLowerCase();
  return `Give me tech-interview question about
   ${capitalizedAnimal}
   in 50character`;
}
