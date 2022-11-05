import IconFactory from "@/components/Shared/Icons/IconFactory";
import { gql } from "@apollo/client";
import graphcmsClient from "lib/graphcmsClient";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ArrowUpLeft, ArrowUpRight, ExternalLink } from "react-feather";
import type { Skill } from "types/graphcms";

interface SkillsPageProps {
  skill: Skill;
}

const SkillPage: NextPage<SkillsPageProps> = ({ skill }) => {
  console.log(skill);
  return (
    <>
      <div className="flex space-x-8">
        <IconFactory name={skill.iconName} className="h-16 w-16" />
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold">{skill.name}</h1>
          <p className="text-gray-300 text-sm">{skill.description}</p>
        </div>
      </div>
      <a
        href={skill.link}
        className="mt-8 text-gray-300 flex space-x-1 items-end text-sm hover:text-gray-100 transition duration-200"
      >
        <span>{skill.link}</span> <ArrowUpRight className="h-4 w-4" />
      </a>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await graphcmsClient.query({
    query: gql`
      query PageSkill($slug: String!) {
        skill(where: { slug: $slug }) {
          iconName
          id
          link
          name
          description
        }
      }
    `,
    variables: {
      slug: params.slug,
    },
  });

  const skill = data.skill;

  return {
    props: { skill },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await graphcmsClient.query({
    query: gql`
      query PageSkillPaths {
        skills {
          slug
        }
      }
    `,
  });

  const paths = data.skills.map(skill => {
    return {
      params: {
        slug: skill.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default SkillPage;
