import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Send } from 'lucide-react';
import { chatsApi, getErrorMessage } from '../../api';
import type { Chat, ChatMessage } from '../../types/chat';
import { ErrorBanner } from '../ui/ErrorBanner';

const POLL_MS = 5000;

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });

export function ChatsPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadChats = useCallback(async () => {
    try {
      setChats(await chatsApi.list());
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoaded(true);
    }
  }, []);

  const loadMessages = useCallback(async (id: number) => {
    try {
      setMessages(await chatsApi.messages(id));
    } catch (e) {
      setError(getErrorMessage(e));
    }
  }, []);

  // Простий опитування сервера кожні кілька секунд замість WebSocket
  useEffect(() => {
    loadChats();
    const timer = setInterval(loadChats, POLL_MS);
    return () => clearInterval(timer);
  }, [loadChats]);

  useEffect(() => {
    if (activeId === null) return;
    loadMessages(activeId);
    const timer = setInterval(() => loadMessages(activeId), POLL_MS);
    return () => clearInterval(timer);
  }, [activeId, loadMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [messages]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const value = text.trim();
    if (!value || activeId === null) return;
    try {
      const sent = await chatsApi.send(activeId, value);
      setMessages((prev) => [...prev, sent]);
      setText('');
      loadChats();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const active = chats.find((c) => c.id === activeId);

  return (
    <div className="flex h-full min-h-96 bg-white border border-zinc-300 rounded-xl shadow-sm overflow-hidden">
      {error && <ErrorBanner message={error} onClose={() => setError('')} />}

      <aside className="w-72 shrink-0 border-r border-zinc-300 overflow-y-auto">
        <div className="px-4 py-3 border-b border-zinc-200 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Telegram
        </div>
        {loaded && chats.length === 0 && (
          <p className="p-4 text-sm text-zinc-500">Розмов поки немає. Напишіть боту в Telegram.</p>
        )}
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setActiveId(chat.id)}
            className={`w-full text-left px-4 py-3 border-b border-zinc-100 hover:bg-zinc-50 ${
              chat.id === activeId ? 'bg-zinc-100' : ''
            }`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-medium text-zinc-900 truncate">{chat.name}</span>
              <span className="text-xs text-zinc-400 shrink-0">{formatTime(chat.updatedAt)}</span>
            </div>
            <p className="text-sm text-zinc-500 truncate">{chat.lastMessage}</p>
          </button>
        ))}
      </aside>

      <section className="flex-1 flex flex-col min-w-0">
        {!active ? (
          <div className="flex-1 flex items-center justify-center text-sm text-zinc-500">
            Оберіть розмову зліва
          </div>
        ) : (
          <>
            <div className="px-5 py-3 border-b border-zinc-300 font-medium text-zinc-900">{active.name}</div>
            <div className="flex-1 overflow-y-auto p-5 space-y-2 bg-zinc-50">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.direction === 'OUT' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-xl text-sm whitespace-pre-wrap break-words ${
                      m.direction === 'OUT'
                        ? 'bg-zinc-900 text-white'
                        : 'bg-white border border-zinc-300 text-zinc-900'
                    }`}
                  >
                    {m.text}
                    <div className="mt-1 text-[11px] text-zinc-400">
                      {formatTime(m.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <form onSubmit={handleSend} className="flex gap-2 p-3 border-t border-zinc-300">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Напишіть повідомлення..."
                className="flex-1 h-10 px-3 bg-white border border-zinc-300 rounded-lg text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
              />
              <button
                type="submit"
                disabled={!text.trim()}
                className="h-10 px-4 inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                Надіслати
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
