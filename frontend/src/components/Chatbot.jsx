import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { sendChatMessage } from '../services/api';

const Chatbot = ({ isOpen: initialIsOpen = false, onClose }) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', content: "Hello! I'm OncoMind Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendChatMessage(input.trim());
      if (response.success) {
        const botMessage = {
          id: Date.now() + 1,
          role: 'bot',
          content: response.data.response
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: "I apologize, but I'm having trouble responding right now. Please try again."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-primary-green via-emerald-500 to-teal-600 rounded-2xl shadow-modern-xl flex items-center justify-center text-white z-50 group"
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-danger rounded-full border-2 border-white animate-pulse"></div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        height: isMinimized ? 'auto' : '600px'
      }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={`fixed bottom-6 right-6 w-96 glass-card rounded-3xl shadow-modern-xl overflow-hidden z-50 ${
        isMinimized ? 'h-auto' : 'h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-green via-emerald-500 to-teal-600 text-white p-5 flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">OncoMind Assistant</h3>
            <p className="text-xs text-white/80">AI Cancer Care Support</p>
          </div>
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-4 py-3 text-xs text-amber-700 border-b border-amber-200/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-amber-500">⚠️</span>
          <span className="font-medium">Medical Disclaimer:</span>
        </div>
        <p className="mt-1 text-amber-600">
          This AI assistant provides general information only. Always consult healthcare professionals for medical advice and treatment decisions.
        </p>
      </div>

      {/* Messages */}
      {!isMinimized && (
        <>
          <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50">
            {messages.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-green/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-primary-green" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Welcome to OncoMind Assistant</h4>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                  I'm here to help you with cancer care information, symptom tracking, and connecting you with healthcare professionals.
                </p>
              </motion.div>
            ) : (
              messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-modern ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-primary-green to-emerald-600' 
                        : 'glass-card'
                    }`}>
                      {msg.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-primary-green" />
                      )}
                    </div>
                    <div className={`p-4 rounded-2xl shadow-modern ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-primary-green to-emerald-600 text-white' 
                        : 'glass-card text-gray-800'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
            
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center shadow-modern">
                    <Bot className="w-5 h-5 text-primary-green" />
                  </div>
                  <div className="glass-card p-4 rounded-2xl shadow-modern">
                    <div className="flex gap-1">
                      <motion.span 
                        className="w-2 h-2 bg-primary-green rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span 
                        className="w-2 h-2 bg-primary-green rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span 
                        className="w-2 h-2 bg-primary-green rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-100">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about cancer care..."
                  className="w-full px-4 py-3 pr-12 rounded-2xl glass-input border-0 focus:ring-2 focus:ring-primary-green/50 focus:border-primary-green transition-all duration-200"
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  {loading && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-primary-green border-t-transparent rounded-full"
                    />
                  )}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="px-4 py-3 bg-gradient-to-r from-primary-green to-emerald-600 text-white rounded-2xl shadow-modern hover:shadow-modern-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {['Symptom tracking', 'Treatment options', 'Find specialists', 'Emergency help'].map((action, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setInput(action)}
                  className="px-3 py-1.5 text-xs bg-primary-green/10 text-primary-green rounded-xl hover:bg-primary-green/20 transition-colors border border-primary-green/20"
                >
                  {action}
                </motion.button>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Chatbot;

