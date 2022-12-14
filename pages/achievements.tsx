import AchievementCard from "@/components/Achievements/AchievementCard";
import { allAchievements } from "contentlayer/generated";
import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { CleanedAchievement } from "types/achievements";

interface AchievementPageProps {
  achievements: CleanedAchievement[];
}

const AchievementsPage: NextPage<AchievementPageProps> = ({ achievements }) => {
  return (
    <>
      <NextSeo
        title="Achievements | Harry Schiller"
        description="Harry Schiller's Achievements"
      />
      <h1 className="mb-8 text-2xl font-bold">Achievements</h1>
      <div className="flex flex-col space-y-8">
        {achievements.map(({ id, title, content, date, proof, prizeValue, image }) => (
          <AchievementCard
            key={id}
            title={title}
            content={content}
            date={date}
            proof={proof}
            prizeValue={prizeValue}
            image={image}
          />
        ))}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const cleanedAchievements = allAchievements.map(achievement => ({
    id: achievement._id,
    title: achievement.title,
    content: achievement.body.code,
    date: achievement.date ?? null,
    prizeValue: achievement.prizeValue ?? null,
    proof: achievement.proof ?? null,
    image: achievement.image ?? null,
  })).sort((a, b) => b.date.localeCompare(a.date));

  return {
    props: { achievements: cleanedAchievements },
  };
};

export default AchievementsPage;
