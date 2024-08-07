import React, { useEffect, useRef } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';
import cover1 from '../../images/cover1.jpg';
import cover2 from '../../images/cover2.png';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-slate);
    color: var(--dark-navy);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 1; /* Make sure image is fully visible */
    }

    a {
      width: 100%;
      height: 100%;
      background-color: var(--green);
      border-radius: var(--border-radius);
      vertical-align: middle;

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before,
        .img {
          background: transparent;
          filter: none;
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        background-color: transparent; /* Make sure the overlay is transparent */
        mix-blend-mode: normal;
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: normal; /* Make sure the blend mode is normal */
      filter: none; /* Remove filter */

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: none; /* Remove filter for smaller screens */
      }
    }
  }
`;
const featuredProjects = [
  {
    title: 'Prophet',
    cover: cover1,
    tech: ['React', 'JavaScript', 'Python', 'Flask'],
    github: 'https://github.com/grepo9/restaurantrecommender',
    external: 'https://github.com/grepo9/restaurantrecommender',
    cta: 'https://projectone.com/learn-more',
    description:
      '<p>Full stack web app that suggests restaurants from the Yelp API using a machine learning prediction model that trains from a user\'s preferences, locations, and previous food choices</p>',
  },
  {
    title: 'Tendance',
    cover: cover2,
    tech: ['React', 'Vite', 'TypeScript', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/grepo9/Tendance',
    external: 'https://github.com/grepo9/Tendance',
    description:
      '<p>Full stack web app that performs sentiment based stock market analysis and signals when to buy/sell a stock.</p>',
  },
  {
    title: 'Reel Raters',
    cover: cover1,
    tech: ['Django', 'Python', 'JavaScript', 'Heroku'],
    github: 'https://github.com/grepo9/reelraters',
    external: 'https://github.com/grepo9/reelraters',
    cta: 'https://projectone.com/learn-more',
    description:
      '<p>Django project that allows users to add movies and rate them to a personal list, pulling from the TheMovieDB API</p>',
  },

  // Add more projects as needed
];
const Featured = () => {
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Things I've Built
      </h2>

      <StyledProjectsGrid>
        {featuredProjects.map((project, i) => {
          const { title, cover, tech, github, external, description } = project;
          const image = getImage(cover);

          return (
            <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
              <div className="project-content">
                <div>
                  <p className="project-overline">Featured Project</p>

                  <h3 className="project-title">
                    <a href={external}>{title}</a>
                  </h3>

                  <div
                    className="project-description"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />

                  {tech.length && (
                    <ul className="project-tech-list">
                      {tech.map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))}
                    </ul>
                  )}

                  <div className="project-links">
                    {/* {cta && (
                      <a href={cta} aria-label="Course Link" className="cta">
                        Learn More
                      </a>
                    )} */}
                    {github && (
                      <a href={github} aria-label="GitHub Link">
                        <Icon name="GitHub" />
                      </a>
                    )}
                    {/* {external && !cta && (
                      <a href={external} aria-label="External Link" className="external">
                        <Icon name="External" />
                      </a>
                    )} */}
                  </div>
                </div>
              </div>

              <div className="project-image">
                <a href={external ? external : github ? github : '#'}>
                  {image ? (
                    <GatsbyImage image={image} alt={title} className="img" />
                  ) : (
                    <img src={cover} alt={title} className="img" />
                  )}
                </a>
              </div>
            </StyledProject>
          );
        })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
