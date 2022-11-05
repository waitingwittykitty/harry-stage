import NextImage from "next/image";

import { cleanLink, getGitHubOwnerAndRepoFromLink } from "@/utils/helpers";
import Link from "@/components/Shared/Link";
import { CloudinaryImage } from "contentlayer/generated";
import { GitHubLogo } from "@/components/Shared/Icons";
import { forwardRef } from "react";

interface ProjectProps {
  slug: string;
  name: string;
  description: string;
  link: string;
  githubLink: string;
  image: CloudinaryImage;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectProps>(
  (
    { slug, name, description, image, link, githubLink }: ProjectProps,
    ref
  ): JSX.Element => {
    return (
      <div
        className="flex flex-col space-y-8 rounded-lg border-[1px] border-tertiary bg-secondary p-4 transition duration-200 md:h-48 md:flex-row md:space-y-0 md:space-x-8 md:hover:scale-105"
        ref={ref}
      >
        <div className="overflow-hidden rounded-lg">
          <div className="relative h-36 w-full md:h-full md:w-72">
            <NextImage
              src={image.url}
              alt={name}
              className="rounded-lg"
              layout="fill"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm text-gray-300">{description}</p>
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
              {link && <Link href={link}>{cleanLink(link)}</Link>}
              {githubLink && (
                <Link href={githubLink} icon={<GitHubLogo />}>
                  {getGitHubOwnerAndRepoFromLink(githubLink)}
                </Link>
              )}
            </div>
          </div>
          <Link href={`/projects/${slug}`} className="mt-4">
            Learn More
          </Link>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
