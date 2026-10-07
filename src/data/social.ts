export interface SocialLink {
  platform: 'instagram' | 'x';
  label: string;
  url: string | null;
}

// TODO: Ganti null dengan URL akun resmi Anda. Ikon otomatis menjadi tautan saat URL diisi.
export const socialLinks: SocialLink[] = [
  { platform: 'instagram', label: 'Instagram', url: null },
  { platform: 'x', label: 'X', url: null },
];
