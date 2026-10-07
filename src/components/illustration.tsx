// Original flat-vector artwork stored in public/illustrations. No remote image requests.
import Image from 'next/image';
export function Illustration({
  kind = 'campus',
  className = '',
  priority = false,
}: {
  kind?: 'campus' | 'compass' | 'journey';
  className?: string;
  priority?: boolean;
}) {
  const alts = {
    campus:
      'Tiga mahasiswa mengenali arah peluang di depan kampus, dengan matahari terbit sebagai simbol langkah awal.',
    compass:
      'Kompas dengan arah berbeda, menggambarkan kebebasan mengeksplorasi minat selama kuliah.',
    journey: 'Jejak langkah menuju matahari, menggambarkan perjalanan eksplorasi yang bertahap.',
  };
  return (
    <Image
      src={`/illustrations/${kind}.svg`}
      width={kind === 'campus' ? 600 : 420}
      height={kind === 'campus' ? 520 : 360}
      alt={alts[kind]}
      className={className}
      priority={priority}
    />
  );
}
