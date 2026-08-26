import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { ToastProvider } from "@/components/ui/toast/ToastProvider";
import { ResultStoryView } from "@/components/results/ResultStoryView";
import { ResultsJsonLd } from "@/components/results/ResultsJsonLd";
import { STUDENT_SUCCESS_STORIES } from "@/data/results";

interface ResultStoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(STUDENT_SUCCESS_STORIES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ResultStoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = STUDENT_SUCCESS_STORIES[slug];

  if (!story) {
    return {
      title: "Result Story Not Found | Emprise Academy",
    };
  }

  const title = `${story.studentName} – ${story.examLabel} Result ${story.academicYear} | Emprise Academy`;
  const description = `${story.headline}. Verified student success story from Emprise Academy Mathura. All India Rank #${story.airRank || story.categoryRank} in ${story.examLabel}.`;

  return {
    title,
    description,
    keywords: [
      story.studentName,
      `${story.studentName} JEE`,
      `${story.studentName} Emprise Academy`,
      "JEE Result Mathura",
      "Emprise Academy Success Story",
    ],
    alternates: {
      canonical: `https://empriseacademy.com/results/${story.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://empriseacademy.com/results/${story.slug}`,
      siteName: "Emprise Academy",
      locale: "en_IN",
      type: "article",
    },
  };
}

export default async function IndividualResultStoryPage({ params }: ResultStoryPageProps) {
  const { slug } = await params;
  const story = STUDENT_SUCCESS_STORIES[slug];

  if (!story) {
    notFound();
  }

  return (
    <ToastProvider>
      <ResultsJsonLd
        pageTitle={`${story.studentName} – ${story.examLabel} Result`}
        description={story.achievementSummary}
        url={`https://empriseacademy.com/results/${story.slug}`}
        breadcrumbs={[
          { name: "Home", item: "https://empriseacademy.com" },
          { name: "Results", item: "https://empriseacademy.com/results" },
          { name: story.studentName, item: `https://empriseacademy.com/results/${story.slug}` },
        ]}
        storyArticle={{
          headline: story.headline,
          studentName: story.studentName,
        }}
      />

      <Navbar />

      <main className="flex-1">
        <ResultStoryView story={story} />
      </main>

      <Footer />
      <MobileBottomCTA />
    </ToastProvider>
  );
}
