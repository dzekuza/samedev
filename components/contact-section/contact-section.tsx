'use client'

import React, { useState } from 'react'
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea
} from '@/components/ui/prompt-input'
import { Button } from '@/components/ui/button'
import { Send, MessageCircle, Loader2 } from 'lucide-react'
import { sendChatMessage, type ChatMessage } from '@/app/actions/chat'
import { AIQuestion } from '@/components/ui/ai-question'
import styles from './contact-section.module.css'

export function ContactSection () {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
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
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>Let&apos;s work together</h2>
            <p className={styles.description}>
              Ready to bring your ideas to life? Let&apos;s discuss your project and create something amazing together.
            </p>
          </div>

          <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
              <div className={styles.chatIcon}>
                <MessageCircle className={styles.icon} />
              </div>
              <div className={styles.chatInfo}>
                <h3 className={styles.chatTitle}>Start a conversation</h3>
                <p className={styles.chatSubtitle}>Tell us about your project</p>
              </div>
            </div>

            <div className={styles.chatInput}>
              {/* Prepared Messages */}
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
                  placeholder="Describe your project, goals, or ask us anything..."
                  className={styles.textarea}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                />
                <PromptInputActions className={styles.actions}>
                  <PromptInputAction
                    tooltip={isLoading ? 'Processing...' : 'Send message'}
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

            <div className={styles.chatFeatures}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>💬</div>
                <div className={styles.featureText}>
                  <h4>Quick Response</h4>
                  <p>We&apos;ll get back to you within 24 hours</p>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🎯</div>
                <div className={styles.featureText}>
                  <h4>Project Consultation</h4>
                  <p>Free initial consultation and project planning</p>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🚀</div>
                <div className={styles.featureText}>
                  <h4>Fast Delivery</h4>
                  <p>Efficient workflow and timely project delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
