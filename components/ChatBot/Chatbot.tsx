'use client';
import { useState, useEffect, FormEvent, useRef } from 'react';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { LoadingSpinner } from '../ui/loadingSpinner';
import Image from 'next/image';
import { pauseMark, submitMark } from '@/public/images';

interface Message {
  text: string;
  sender: 'user' | 'server';
}

const Chatbot = () => {
  // WebSocket 상태
  const [socket, setSocket] = useState<WebSocket | null>(null); // WebSocket 객체의 타입 설정
  const [messages, setMessages] = useState<Message[]>([]); // 메시지 상태 (Message 타입 배열)
  const [isOpen, setIsOpen] = useState<boolean>(false); // 채팅 창 열림 상태
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);

  const onConnect = () => {
    const ws = new WebSocket('ws://localhost:8080/ws/chat'); // 실제 WebSocket 서버 주소로 변경
    ws.onopen = () => {
      console.log('WebSocket 연결 성공');
      setSocket(ws);
    };

    ws.onmessage = (event: MessageEvent) => {
      const message = event.data;
      console.log(message);
      // 서버에서 메시지가 도착하면 messages 배열에 추가
      setLoading(false);
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'server' }]);
    };
  };

  // WebSocket 연결 및 종료 설정
  useEffect(() => {
    // ws.onclose = () => {
    //   console.log('WebSocket 연결 종료');
    // };
    // // 컴포넌트 언마운트 시 WebSocket 종료
    // return () => {
    //   ws.close();
    // };
  }, []);

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const inputMessage = textRef.current?.value ?? '';

    if (inputMessage === '') {
      return;
    }
    // 클라이언트에서 서버로 메시지 전송
    if (socket) {
      socket.send(inputMessage);
      setMessages((prevMessages) => [...prevMessages, { text: inputMessage, sender: 'user' }]);
    }
    textRef.current!.value = '';
  };

  const handleClickChatbotBtn = () => {
    setIsOpen(!isOpen);
    onConnect();
  };

  const handleFormKeypress = (event: any) => {
    if (event.key === 'Enter') {
      sendMessage(event);
    }
  };

  const handleTextAreaKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.value = '';
    }
  };

  const handleOpenChange = (bool: boolean) => {
    setIsOpen(bool);
    setMessages([]);
  };

  return (
    <div className="relative">
      {/* 챗봇 아이콘 */}
      <div
        className="fixed bottom-8 left-8 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer z-50"
        onClick={handleClickChatbotBtn}
      >
        💬
      </div>

      {/* 채팅창 */}
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogContent className="w-[400px] min-h-[500px] bg-white border rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle>챗봇</DialogTitle>
              <DialogDescription>여기에 질문을 입력하세요.</DialogDescription>
            </DialogHeader>
            <div className="flex-1 p-4 overflow-y-auto h-[320px]">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <span
                    className={`inline-block px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-black'
                    }`}
                  >
                    {message.text}
                  </span>
                </div>
              ))}
              {loading && <LoadingSpinner />}
            </div>

            {/* 메시지 입력 영역 ^↻ */}
            <form
              onSubmit={sendMessage}
              onKeyDownCapture={handleFormKeypress}
              className="relative flex mt-4"
            >
              <Textarea
                ref={textRef}
                onKeyDownCapture={handleTextAreaKeyPress}
                className="resize-none text-base"
                placeholder="메시지를 입력하세요..."
                required
              />
              <Button
                type="submit"
                className="absolute right-1 bottom-1 w-8 h-8 text-lg bg-white font-extrabold text-white p-1 rounded-full hover:bg-blue-600"
              >
                {loading ? (
                  <Image src={pauseMark} alt="중지" />
                ) : (
                  <Image src={submitMark} alt="제출" />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Chatbot;
