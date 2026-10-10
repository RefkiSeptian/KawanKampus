import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  CircleDot,
  Clock3,
  Sparkles,
  Globe2,
} from 'lucide-react';
import { site } from '@/data/site';
import { categories } from '@/data/categories';
import { homeDesign, homePhotos } from '@/data/home';
import { pageMetadata } from '@/lib/metadata';
import styles from './home.module.css';
import { HomeMotion } from '@/components/home-motion';

export const metadata = pageMetadata('Kenali Peluang Selama Kuliah', site.home.description, '/');

export default function Home() {
  return (
    <HomeMotion className={`${styles.home} home-reference-page`}>
      <section className={`${styles.hero} ${styles.wrap}`}>
        <div className={`${styles.heroCopy} hero-copy`}>
          <span className={styles.eyebrow}>{homeDesign.eyebrow}</span>
          <h1>
            {homeDesign.headline.map((line, index) => (
              <span key={line} className={index === 1 ? styles.accent : undefined}>
                {line}
              </span>
            ))}
          </h1>
          <p className={styles.heroDescription}>{site.home.description}</p>
          <div className={styles.actions}>
            <span className={styles.primaryAction}>
              <Link href="/kuis" className="button primary">
                Temukan Minatku
                <ArrowUpRight size={19} />
              </Link>
              <svg
                className={styles.ctaSketch}
                viewBox="0 0 140 140"
                fill="none"
                aria-hidden="true"
              >
                <path
                  className={styles.sketchLine}
                  pathLength="1"
                  d="M118 18C130 67 85 78 66 53C42 20 96 7 110 47C125 89 79 107 35 120"
                />
                <path className={styles.sketchTip} d="m62 126-27-6 20-19" />
              </svg>
            </span>
            <Link href="/jelajahi-peluang" className="button secondary">
              Jelajahi Peluang
              <ArrowRight size={19} />
            </Link>
          </div>
          <p className={styles.microcopy}>{homeDesign.microcopy}</p>
        </div>
        <div className={styles.heroArt} data-home-art>
          <span className={styles.orbit} aria-hidden="true" />
          <span className={`${styles.orbit} ${styles.orbitTwo}`} aria-hidden="true" />
          <span className={styles.artNote}>
            {homeDesign.artNote[0]}
            <br />
            {homeDesign.artNote[1]}
          </span>
          <Image
            src="/images/home/hero.webp"
            width={900}
            height={900}
            loading="eager"
            fetchPriority="auto"
            sizes="(max-width: 800px) 90vw, 46vw"
            className={styles.heroImage}
            data-home-hero-image
            alt="Tiga mahasiswa berbagi ide dengan buku dan laptop di tangga berwarna Navy."
          />
          <span className={`${styles.floatingLabel} ${styles.labelOne}`}>
            <CircleDot size={17} aria-hidden="true" />
            {homeDesign.labels[0]}
          </span>
          <span className={`${styles.floatingLabel} ${styles.labelTwo}`}>
            <Sparkles size={17} aria-hidden="true" />
            {homeDesign.labels[1]}
          </span>
          <span className={`${styles.floatingLabel} ${styles.labelThree}`}>
            <Globe2 size={17} aria-hidden="true" />
            {homeDesign.labels[2]}
          </span>
          <span className={styles.stamp} aria-hidden="true">
            {homeDesign.stamp.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </span>
        </div>
      </section>
      <div className={styles.ribbon} aria-label="Lima kategori peluang">
        <div className={styles.ribbonWindow}>
          <div className={styles.ribbonTrack} data-home-ribbon-track>
            <ul className={styles.ribbonList}>
              {categories.map((category) => (
                <li key={category.id}>
                  {category.shortName}
                  <Asterisk size={23} aria-hidden="true" />
                </li>
              ))}
            </ul>
            {[0, 1, 2, 3, 4].map((copy) => (
              <ul
                key={copy}
                className={`${styles.ribbonList} ${styles.ribbonClone}`}
                aria-hidden="true"
              >
                {categories.map((category) => (
                  <li key={category.id}>
                    {category.shortName}
                    <Asterisk size={23} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
      <section
        className={`${styles.quizInvite} ${styles.wrap}`}
        aria-labelledby="home-quiz-title"
        data-reveal
      >
        <div className={styles.quizPoster} aria-hidden="true">
          <div className={styles.quizWords}>
            {homeDesign.quizPoster.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          <Asterisk className={styles.posterSpark} />
        </div>
        <div className={styles.quizCopy}>
          <span className={styles.eyebrow}>{homeDesign.quizEyebrow}</span>
          <h2 id="home-quiz-title">{site.home.quizTitle}</h2>
          <p>{site.home.quizDescription}</p>
          <Link href="/kuis" className="button primary">
            Mulai Kuis
            <ArrowUpRight size={19} />
          </Link>
          <span className={styles.quizMeta}>
            <Clock3 size={15} aria-hidden="true" />
            {homeDesign.quizMeta}
          </span>
        </div>
      </section>
      <section
        className={`${styles.discovery} ${styles.wrap} home-discovery`}
        aria-labelledby="home-discovery-title"
      >
        <div className={styles.sectionHeading} data-reveal>
          <div>
            <span className={styles.eyebrow}>{homeDesign.discoveryEyebrow}</span>
            <h2 id="home-discovery-title">{site.home.categoriesTitle}.</h2>
          </div>
          <p>
            {homeDesign.discoveryDescription[0]}
            <br />
            {homeDesign.discoveryDescription[1]}
          </p>
        </div>
        <div>
          {categories.map((category) => {
            const photo = homePhotos[category.id];
            return (
              <article
                key={category.id}
                className={`${styles.categoryRow} home-category-row`}
                data-reveal
              >
                <Link
                  href={`/peluang/${category.id}`}
                  className={`${styles.categoryVisual} home-category-visual`}
                  aria-label={`Kenali ${category.name}`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    src={photo.src}
                    alt=""
                    width={800}
                    height={600}
                    sizes="(max-width: 600px) 90vw, 44vw"
                  />
                </Link>
                <div className={styles.categoryCopy}>
                  <h3>{category.name}</h3>
                  <p>{category.cardDescription}</p>
                  <Link href={`/peluang/${category.id}`} className={styles.categoryLink}>
                    Kenali Peluangnya
                    <ArrowUpRight size={21} aria-hidden="true" />
                    <span className="sr-only">: {category.name}</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section
        className={`${styles.closing} closing-banner`}
        aria-labelledby="home-closing-title"
        data-reveal
      >
        <div className={styles.closingInner}>
          <Asterisk className={styles.closingSpark} aria-hidden="true" />
          <div>
            <span className={styles.eyebrow}>{homeDesign.closingEyebrow}</span>
            <h2 id="home-closing-title">{site.home.closingTitle}</h2>
            <p>{site.home.closingDescription}</p>
            <Link href="/jelajahi-peluang" className="button cream">
              Jelajahi Semua Peluang
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>
        <span className={styles.closingLoop} aria-hidden="true" />
      </section>
    </HomeMotion>
  );
}
