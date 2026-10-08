export const assistant = {
  sessionKey: 'kawan-kampus-chat-v1',
  greeting: 'Hai, aku kawankampus.',
  subtitle: 'Teman mencari langkah pertamamu.',
  starters: [
    {
      label: 'Bantu aku mulai',
      message:
        'Aku belum tahu ingin mencoba apa selama kuliah. Bantu aku menemukan satu langkah awal.',
    },
    {
      label: 'Kenali dunia kerja',
      message:
        'Apa bedanya simulasi pekerjaan, magang, dan platform lowongan? Aku ingin mulai mengenali dunia kerja.',
    },
    {
      label: 'Cari dukungan biaya',
      message:
        'Aku ingin mengenali pilihan beasiswa dan bantuan kuliah. Sebaiknya mulai dari mana?',
    },
  ],
} as const;

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
export interface ChatSource {
  id: string;
  label: string;
  url: string;
}
export interface DisplayMessage extends ChatMessage {
  sources?: ChatSource[];
}
export const MAX_MESSAGE_LENGTH = 2000;
export const MAX_HISTORY = 12;
