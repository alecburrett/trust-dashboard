"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { Card } from "../ui/Card";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const FAQ_RESPONSES: Record<string, string> = {
  soc2: "We maintain SOC 2 Type II certification, demonstrating our commitment to security, availability, and confidentiality. Our certification is audited annually by an independent third party.",
  security:
    "We implement industry-standard security measures including encryption at rest and in transit, multi-factor authentication, regular security audits, and 24/7 monitoring.",
  data: "Your data is encrypted using AES-256 encryption at rest and TLS 1.3 in transit. We follow strict access controls and data retention policies.",
  compliance:
    "We are compliant with SOC 2, ISO 27001, GDPR, and other major security and privacy frameworks. All certifications are regularly audited and updated.",
  gdpr: "We are fully GDPR compliant. We provide data subject rights support, implement privacy by design, and maintain detailed data processing records.",
  iso27001:
    "We maintain ISO 27001 certification for our information security management system, ensuring systematic management of sensitive information.",
};

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm here to answer questions about our security and compliance. Ask me about our certifications, data security, or compliance frameworks.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simple keyword matching
    const lowerInput = input.toLowerCase();
    let response =
      "I'm sorry, I don't have specific information about that. Please contact our support team for detailed inquiries, or browse our documentation.";

    for (const [keyword, answer] of Object.entries(FAQ_RESPONSES)) {
      if (lowerInput.includes(keyword)) {
        response = answer;
        break;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    }, 500);

    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 sm:w-96 shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Trust Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about security..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="sm" className="px-3">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
