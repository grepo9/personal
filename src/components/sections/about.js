import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;
  margin-top: -100px; /* Add margin to the top to ensure spacing */

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'TypeScript',
    'React',
    'Kubernetes',
    'Node.js',
    'Python',
    'Docker',
    'Ruby',
    'PostgreSQL',
    'GraphQL',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hi! I'm <span style={{ color: '#0000ff' }}>Grant</span>, a software engineer with{' '}
              <span style={{ color: '#0000ff' }}>2 years of professional experience</span> and a
              deep passion for developing innovative solutions. I'm constantly learning new
              technologies in the ever-evolving world of computer science.
            </p>

            <p>
              Currently, I work as a{' '}
              <span style={{ color: '#0000ff' }}>full stack developer at Super Micro Computer</span>
              . I have a strong interest in <span style={{ color: '#0000ff' }}>ML/AI</span> and
              dedicate time to developing my own personal projects in this field.
            </p>

            <p>
              I'm also currently pursuing a{' '}
              <span style={{ color: '#0000ff' }}>Master's degree in Computer Science</span> to
              further enhance my skills.
            </p>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>
      </div>
    </StyledAboutSection>
  );
};

export default About;
