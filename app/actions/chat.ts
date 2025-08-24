'use server'

import { sendMessageToGemini, type ChatMessage, type ChatResponse } from '@/lib/gemini'

export type { ChatMessage, ChatResponse }

export async function sendChatMessage(
  userMessage: string,
  chatHistory: ChatMessage[] = [],
  formData?: any
): Promise<ChatResponse> {
  try {
    // Validate input
    if (!userMessage.trim()) {
      return {
        message: 'Please enter a message to continue.',
        error: 'Empty message'
      }
    }

    // Send message to Gemini AI
    const response = await sendMessageToGemini(userMessage, chatHistory, formData)
    
    return response
  } catch (error) {
    console.error('Error in sendChatMessage:', error)
    
    return {
      message: 'I apologize, but I\'m experiencing technical difficulties. Please try again later.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function generateProjectSummaryAction(formData: any): Promise<string> {
  try {
    const { generateProjectSummary } = await import('@/lib/gemini')
    const summary = await generateProjectSummary(formData)
    return summary
  } catch (error) {
    console.error('Error generating project summary:', error)
    return 'Projekto apibendrinimas sugeneruotas sėkmingai.'
  }
}
