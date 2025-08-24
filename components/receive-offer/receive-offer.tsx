'use client'

import React, { useState } from 'react'
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea
} from '@/components/ui/prompt-input'
import { Button } from '@/components/ui/button'
import { Send, Loader2 } from 'lucide-react'
import { sendChatMessage } from '@/app/actions/chat'
import { type ChatMessage } from '@/lib/gemini'
import { AIQuestion } from '@/components/ui/ai-question'
import styles from './receive-offer.module.css'

export function ReceiveOffer () {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    // Prevent double submissions
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setIsLoading(true)
    setError(null)

    // Add user message to chat history
    const userChatMessage: ChatMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }

    setChatHistory(prev => [...prev, userChatMessage])

    try {
      // Send message to AI
      const response = await sendChatMessage(userMessage, chatHistory)

      if (response.error) {
        setError(response.error)
      } else {
        // Add AI response to chat history
        const aiChatMessage: ChatMessage = {
          role: 'assistant',
          content: response.message,
          timestamp: new Date(),
          question: response.question
        }

        setChatHistory(prev => [...prev, aiChatMessage])
      }
    } catch (err) {
      setError('Failed to send message. Please try again.')
      console.error('Chat error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleValueChange = (value: string) => {
    setInput(value)
  }

  const handlePreparedMessage = (message: string) => {
    setInput(message)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.subtitle}>Receive offer</h2>
          <h1 className={styles.title}>Answer few questions and receive personal offer</h1>
        </div>

        <div className={styles.inputContainer}>
          {/* Prepared Messages - Only show when no chat history */}
          {chatHistory.length === 0 && (
            <div className={styles.preparedMessages}>
              <button
                className={styles.preparedMessageButton}
                onClick={() => handlePreparedMessage('I need website')}
                type="button"
                disabled={isLoading}
              >
                I need website
              </button>
              <button
                className={styles.preparedMessageButton}
                onClick={() => handlePreparedMessage('I need rebranding')}
                type="button"
                disabled={isLoading}
              >
                I need rebranding
              </button>
            </div>
          )}

          {/* Chat History */}
          {chatHistory.length > 0 && (
            <div className={styles.chatHistory}>
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`${styles.chatMessage} ${
                    message.role === 'user' ? styles.userMessage : styles.aiMessage
                  }`}
                >
                  <div className={styles.messageContent}>
                    {message.content}
                  </div>
                  <div className={styles.messageTime}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  {/* Render AI question if available */}
                  {message.role === 'assistant' && message.question && (
                    <div className="mt-4">
                      <AIQuestion
                        question={message.question.question}
                        options={message.question.options}
                        onOptionSelect={(option) => {
                          setInput(option)
                          handleSubmit()
                        }}
                        disabled={isLoading}
                        className="bg-white border border-gray-200 rounded-lg p-4"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <PromptInput
            value={input}
            onValueChange={handleValueChange}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            className={styles.promptInput}
          >
            <PromptInputTextarea
              placeholder="Write a few words about your project and its requirements"
              className={styles.textarea}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
            <PromptInputActions className={styles.actions}>
              <PromptInputAction
                tooltip={
                  isLoading
                    ? 'Processing...'
                    : 'Send message'
                }
              >
                <Button
                  variant="default"
                  size="icon"
                  className={styles.sendButton}
                  onClick={handleSubmit}
                  disabled={!input.trim() || isLoading}
                >
                  {isLoading
                    ? (
                      <Loader2 className={`${styles.buttonIcon} ${styles.spinning}`} />
                    )
                    : (
                      <Send className={styles.buttonIcon} />
                    )}
                </Button>
              </PromptInputAction>
            </PromptInputActions>
          </PromptInput>
        </div>
      </div>
    </section>
  )
}
