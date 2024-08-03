import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import Jobs from './jobs'; // Ensure the path to Jobs component is correct
import About from './about'; // Ensure the path to About component is correct

const StyledHeroSection = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr; /* Allocate more space to the hero content */
  gap: 300px; /* Increased gap between columns */
  min-height: 100vh;
  padding: 10px;
  align-items: start;

  .hero-content {
    display: flex;
    flex-direction: column;
    padding-top: 140px; /* Adjust this value to position the content */
    padding-right: 20px; /* Add padding to the right */
    width: 200%; /* Ensure full width */
    padding-left: 0px;
    padding-bottom: 0px;
    margin-left: -75px;
    h2,
    h3,
    p {
      width: 250%; /* Ensure full width for headings and paragraphs */
      margin-bottom: 10px;
    }
  }

  .jobs-content {
    display: flex;
    align-items: center; /* Center content vertically */
    padding-top: 50px; /* Adjust this value to position the content */
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const two = <h2 className="big-heading">Grant Chiu</h2>;
  const three = <h3 className="medium-heading">Software Engineer</h3>;

  const items = [two, three];

  return (
    <StyledHeroSection>
      <div className="hero-content">
        {prefersReducedMotion ? (
          <>
            {items.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i + 1}0ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
        <About style={{ marginTop: '20px' }} /> {/* Add the About component with top margin */}
      </div>

      <div className="jobs-content">
        <Jobs />
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
