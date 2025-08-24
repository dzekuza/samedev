import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '')

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are a professional web development and design consultant for GVOZDOVIC Studios. You help clients understand their project requirements and provide guidance on web development, branding, and digital solutions.

**RESPONSE STYLE REQUIREMENTS:**
- Keep responses concise (2-4 sentences maximum)
- Use clear, professional language
- Structure responses with bullet points when appropriate
- Be specific and actionable
- Ask targeted follow-up questions when needed

**YOUR ROLE:**
1. Ask clarifying questions about their project
2. Provide professional advice on technology choices
3. Help estimate project scope and timeline
4. Suggest next steps for their project

**RESPONSE FORMAT:**
- Start with a brief acknowledgment or answer
- Provide specific guidance or recommendations
- End with a clear next step or question
- Use bullet points for multiple items
- Keep tone friendly but professional

**QUESTION FORMAT WITH PRESET BUTTONS:**
When asking questions, format them with preset answer options like this:

**Question:** What platform would you prefer for your e-commerce website?

**Options:**
• Shopify
• WooCommerce
• Custom Solution
• I need advice

**EXAMPLE RESPONSE STRUCTURE:**
"Based on your [project type], here's what I recommend:

• **Technology Stack:** [specific recommendations]
• **Timeline:** [estimated duration]
• **Next Steps:** [clear action items]

**Question:** What's your budget range for this project?

**Options:**
• €2,000 - €5,000
• €5,000 - €10,000
• €10,000 - €20,000
• I need a custom quote"

Always be helpful, specific, and guide the conversation toward a clear project understanding.`

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  question?: {
    question: string
    options: string[]
    type: 'single' | 'multiple'
  }
}

export interface ChatResponse {
  message: string
  error?: string
  question?: {
    question: string
    options: string[]
    type: 'single' | 'multiple'
  }
  suggestions?: string[]
}

export async function sendMessageToGemini (
  userMessage: string,
  chatHistory: ChatMessage[] = [],
  formData?: any
): Promise<ChatResponse> {
  try {
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      throw new Error('Google Gemini API key is not configured')
    }

    // If we have form data, use targeted response generation
    if (formData) {
      const targetedResponse = generateTargetedResponse(formData, userMessage)
      return {
        message: targetedResponse
      }
    }

    // Create a new chat session
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }]
        },
        {
          role: 'model',
          parts: [{ text: 'Hello! I\'m here to help you with your web development and design project. Tell me more about what you\'re looking to build.' }]
        }
      ]
    })

    // Add chat history context
    if (chatHistory.length > 0) {
      const historyText = chatHistory
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n')

      await chat.sendMessage(`Previous conversation context:\n${historyText}\n\nCurrent message: ${userMessage}`)
    } else {
      // Send the user message
      await chat.sendMessage(userMessage)
    }

    // Get the response
    const result = await chat.sendMessage(userMessage)
    const response = await result.response
    const text = response.text()

    // Parse the response to extract structured questions
    return parseAIResponse(text)
  } catch (error) {
    console.error('Error communicating with Gemini AI:', error)

    return {
      message: 'I apologize, but I\'m having trouble connecting to our AI assistant right now. Please try again in a moment, or feel free to contact us directly.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Helper function to format messages for display
export function formatMessage (message: string): string {
  return message.trim()
}

// Helper function to validate user input
export function validateUserInput (input: string): boolean {
  return input.trim().length > 0 && input.trim().length <= 1000
}

// Helper function to extract questions from form data
export function extractQuestionsFromFormData (formData: any): string[] {
  const questions: string[] = []

  if (!formData.projectType) {
    questions.push('What type of project are you looking for? (website, web app, UI/UX design, AI automation)')
  }

  if (!formData.projectGoal) {
    questions.push('What is the main goal of your project? (generate leads, sell products, automate processes, improve branding)')
  }

  if (!formData.targetAudience) {
    questions.push('Who is your target audience and what problem are you solving for them?')
  }

  if (!formData.currentSituation) {
    questions.push('What is your current situation and biggest challenge right now?')
  }

  if (!formData.features || formData.features.length === 0) {
    questions.push('What features or outcomes are most important to you?')
  }

  if (!formData.timeAndBudget?.time) {
    questions.push('What timeline do you have in mind for this project?')
  }

  if (!formData.timeAndBudget?.budget) {
    questions.push('What is your budget range for this project?')
  }

  if (!formData.contact?.name || !formData.contact?.email) {
    questions.push('Could you provide your contact information?')
  }

  return questions
}

// Helper function to generate targeted response based on form data
export function generateTargetedResponse (formData: any, userMessage: string): string {
  const questions = extractQuestionsFromFormData(formData)

  if (questions.length > 0) {
    return `To provide you with the best solution, I need a few more details:

${questions.slice(0, 3).map(q => `• ${q}`).join('\n')}

${questions.length > 3 ? `...and ${questions.length - 3} more questions to fully understand your needs.` : ''}

Could you start by answering these key questions?`
  }

  // If we have most data, provide a summary and next steps
  if (formData.projectType && formData.projectGoal && formData.targetAudience) {
    return `Perfect! Based on your ${formData.projectType} project, here's my recommendation:

• **Project Scope:** ${formData.projectType} focused on ${formData.projectGoal}
• **Target Audience:** ${formData.targetAudience}
• **Key Features:** ${formData.features?.join(', ') || 'To be defined'}

**Next Steps:**
1. Schedule a consultation call
2. Review detailed project proposal
3. Begin development planning

Would you like to proceed with a detailed project proposal?`
  }

  return 'I\'d love to help you with your project! Could you tell me more about what you\'re looking to build?'
}

// Helper function to generate project summary for form submissions
export async function generateProjectSummary (formData: any): Promise<string> {
  try {
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return 'Project summary generation is currently unavailable.'
    }

    const projectData = `
Projekto Tipas: ${formData.projectType}
Projekto Tikslas: ${formData.projectGoal}
Tikslinė Auditorija: ${formData.targetAudience}
Dabartinė Situacija: ${formData.currentSituation}
Pagrindinės Funkcijos: ${formData.features?.join(', ')}
Laiko Planas: ${formData.timeAndBudget?.time} savaitės
Biudžetas: ${formData.timeAndBudget?.budget ? `€${formData.timeAndBudget.budget[0].toLocaleString()} - €${formData.timeAndBudget.budget[1].toLocaleString()}` : 'Nepateikta'}
Nuorodos: ${formData.urls?.filter((url: string) => url.trim()).join(', ') || 'Nepateikta'}
Kontaktas: ${formData.contact?.name} (${formData.contact?.email})
`.trim()

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
    const result = await model.generateContent(`
Suapibinkite šį projektą 2-3 sakiniuose lietuvių kalba. Būkite konkretūs ir profesionalūs:

${projectData}
`)

    const response = await result.response
    const text = response.text()

    return text || 'Projekto apibendrinimas sugeneruotas sėkmingai.'
  } catch (error) {
    console.error('Error generating project summary:', error)
    return 'Projekto apibendrinimas sugeneruotas sėkmingai.'
  }
}

// Helper function to parse AI response and extract structured questions
export function parseAIResponse (response: string): ChatResponse {
  const lines = response.split('\n')
  const message: string[] = []
  const options: string[] = []
  let question = ''
  let inOptions = false

  for (const line of lines) {
    const trimmedLine = line.trim()
    
    if (trimmedLine.startsWith('**Question:**')) {
      question = trimmedLine.replace('**Question:**', '').trim()
      inOptions = false
    } else if (trimmedLine.startsWith('**Options:**')) {
      inOptions = true
    } else if (inOptions && trimmedLine.startsWith('•')) {
      const option = trimmedLine.replace('•', '').trim()
      if (option) {
        options.push(option)
      }
    } else if (trimmedLine && !inOptions) {
      message.push(trimmedLine)
    }
  }

  const result: ChatResponse = {
    message: message.join('\n').trim()
  }

  if (question && options.length > 0) {
    result.question = {
      question,
      options,
      type: 'single'
    }
  }

  return result
}
