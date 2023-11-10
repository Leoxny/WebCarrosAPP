import { createContext, ReactNode, useState } from "react"
import { Toast } from "../components/toast"

interface ToastContextData {
    showToast: (message: string, type: TypeMessage) => void
}

type TypeMessage = "DEFAULT" | "SUCCESS"

export interface MessagesProps {
    message: string;
    type: TypeMessage
}

export const ToastContext = createContext({} as ToastContextData);

export const ToastProvider = ({ children }: { children: ReactNode }) => {

    const [messages, setMessages] = useState<MessagesProps[]>([])

    const showToast = (newMessage: string, type: TypeMessage) => {
        let message = {
            message: newMessage,
            type: type,
        }
        setMessages((prevMessage) => [...prevMessage, message])
        setTimeout(() => { hideToast() }, 1000)
    }

    const hideToast = () => {
        setMessages((prevMessage) => prevMessage.slice(1))
    }

    return (

        <ToastContext.Provider value={{ showToast }}>
            {children}
            {messages.length > 0 && <Toast messages={messages} hideToast={hideToast} />}
        </ToastContext.Provider>
    )
}