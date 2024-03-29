import { ForwardedRef, forwardRef, useState } from "react";
import { useTransition, animated, useSpring } from "react-spring";

import { useInView } from "react-intersection-observer";
import styled from "styled-components";

import { Tag, projectList, Project } from "@lib/projects";

import { Title } from "@components/Title";

const cardDimensions = {
  // Card width
  width: 300,
  // Card height
  height: 170,
  // Card left and right margin
  lrMargin: 20,
  // Card top and bottom margin
  tbMargin: 20,
};

const tagColor = (tag: Tag) => {
  switch (tag) {
    case Tag.Rust: {
      return "#f9b922";
    }
    case Tag.Typescript: {
      return "#22f971";
    }
    case Tag.Python: {
      return "#22a0f9";
    }
    case Tag.React: {
      return "#f92251";
    }
    case Tag.ML: {
      return "#f922eb";
    }
    case Tag.CS: {
      return "#178600";
    }
    case Tag.GLSL: {
      return "#5686a5";
    }
    default: {
      return "#ffffff";
    }
  }
};

interface ProjectCardProps {
  project: Project;
  cardw: number;
  cardh: number;
}

const ProjectCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 100%;

  display: inline-block;
  margin-right: 6px;
`;

const ProjectTag = styled.span`
  margin-right: 15px;

  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: -fit-content;

  font: 15px ${(props) => props.theme.fonts.sansSerifBody};
`;

const ProjectTags = styled.div`
  margin-bottom: 15px;
`;

const ProjectText = styled.div`
  font: 400 15px ${(props) => props.theme.fonts.sansSerifBody};
  width: 250px;
  margin-top: 5px;
`;

const ProjectCardStyled = styled(animated.div)`
  display: flex;
  flex-direction: column;

  border: 1px solid #111111;
  background-color: #222222;

  padding: 25px;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  will-change: transform;
`;

const AnimatedProjectLink = styled.a`
  color: #15a1ff;
  text-decoration-color: #15a1ff00;

  font: bold 20px ${({ theme }) => theme.fonts.sansSerifAlt};

  &:hover {
    color: #52a2ff;
    text-decoration-color: #52a2ffff;
  }
`;

const CardWrapperDiv = styled.div`
  position: relative;
  width: 0;
  height: 0;
`;

const ProjectCard = (p: ProjectCardProps) => {
  const { project, cardw, cardh } = p;
  const tags = project.tags.map((tag) => (
    <ProjectTag key={`${tag}-${project.displayName}`}>
      <ProjectCircle style={{ backgroundColor: tagColor(tag as Tag) }} />
      {tag as string}
    </ProjectTag>
  ));

  const [anim, setShadow] = useSpring(() => ({
    boxShadow: 0,
    scale: 1,
  }));

  const onMouseEnter = () => {
    setShadow({ boxShadow: 1, scale: 1.03 });
  };

  const onMouseLeave = () => {
    setShadow({ boxShadow: 0, scale: 1 });
  };

  return (
    <ProjectCardStyled
      style={{
        width: cardw,
        height: cardh,
        // FIXME: Make sure to remove the `as any` cast after
        // https://github.com/react-spring/react-spring/issues/1102 is fixed
        boxShadow: anim.boxShadow.to(
          (s) => `0px 0px ${s * 7 + 1}px rgba(0, 0, 0, ${s * 0.2 + 0.1})`
        ) as any,
        transform: anim.scale.to((s) => `scale(${s}) perspective(1px)`),
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>
        <ProjectTags>{tags}</ProjectTags>
        <AnimatedProjectLink
          href={project.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          {project.displayName}
        </AnimatedProjectLink>
        <ProjectText>{project.description}</ProjectText>
      </div>
    </ProjectCardStyled>
  );
};

interface ProjectGridProps {
  items: Array<Project>;
  visible: boolean;
  width: number;
}

interface ProjectPosition {
  xy: [number, number];
  project: Project;
}

const ProjectGridStyled = styled(animated.div)`
  width: 70vw;
  position: relative;
`;

const ProjectGridAnimated = (p: ProjectGridProps) => {
  const { width: pWidth, visible, items } = p;
  // Calculate on client side
  const width = pWidth * 0.7;

  // Approximate the number of comlumns (without margin)
  const approxCols = Math.floor(width / cardDimensions.width) || 1;

  // Account for margin after approximating number of columns
  const columns =
    approxCols !== 1
      ? Math.floor(
          (width - cardDimensions.lrMargin * approxCols) / cardDimensions.width
        )
      : 1;

  let counterCol = 0;
  let counterRow = 0;
  const gridItems: Array<ProjectPosition> = items.map((child, i) => {
    counterCol += 1;

    if (i % columns === 0) {
      if (i !== 0) {
        // New row
        counterRow += 1;
      }
      // Reset column
      counterCol = 0;
    }

    return {
      xy: [
        (cardDimensions.width + cardDimensions.lrMargin) * counterCol,
        counterRow * (cardDimensions.height + cardDimensions.tbMargin),
      ],
      project: child,
    };
  });

  counterRow += 1;

  const transitions = useTransition(gridItems, {
    from: () => ({
      xy: [0, 0],
      width: cardDimensions.width,
      height: cardDimensions.height,
      opacity: 0,
    }),
    enter: ({ xy }) => ({
      xy: visible ? xy : [0, 0],
      width: cardDimensions.width,
      height: cardDimensions.height,
      opacity: visible ? 1 : 0,
    }),
    update: ({ xy }) => ({
      xy: visible ? xy : [0, 0],
      width: cardDimensions.width,
      height: cardDimensions.height,
      opacity: visible ? 1 : 0,
    }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    keys: (item: ProjectPosition) => item.project.rank,
  });

  const fragment = transitions((style: any, item: ProjectPosition) => {
    const { xy, ...others } = style;
    return (
      <CardWrapperDiv>
        <animated.div
          key={item.project.rank}
          style={{
            position: "absolute",
            transform: xy.to(
              (x: number, y: number) => `translate3d(${x}px, ${y}px, 0px)`
            ),
            ...others,
          }}
        >
          <ProjectCard
            project={item.project}
            cardh={cardDimensions.height}
            cardw={cardDimensions.width}
          />
        </animated.div>
      </CardWrapperDiv>
    );
  });

  const [firstAnim, setFirstAnim] = useState(true);

  const springOptions: { from: undefined | object; to: object } = {
    from: undefined,
    to: {
      height: counterRow * (cardDimensions.height + cardDimensions.tbMargin),
      width: columns * (cardDimensions.width + cardDimensions.lrMargin),
    },
  };

  if (firstAnim) {
    setFirstAnim(false);
    springOptions.from = {
      height: counterRow * (cardDimensions.height + cardDimensions.tbMargin),
      width: columns * (cardDimensions.width + cardDimensions.lrMargin),
    };
  }

  const anims = useSpring(springOptions);

  return (
    <ProjectGridStyled style={{ display: "block", ...anims }}>
      {fragment}
    </ProjectGridStyled>
  );
};

const ProjectPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
`;

const ProjectsStyled = styled.div`
  padding-top: 14vh;
  margin-top: -14vh;
  margin-bottom: 20vh;
  background-color: #1d1d1d;
  color: ${({ theme }) => theme.colors.fontColor};

  @media (max-width: 500px) {
    margin-bottom: 10vh;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
  justify-content: center;
  grid-column-gap: ${cardDimensions.lrMargin}px;
  column-gap: ${cardDimensions.lrMargin}px;
  grid-row-gap: ${cardDimensions.tbMargin}px;
  row-gap: ${cardDimensions.tbMargin}px;
  width: 70vw;
`;

const Projects = forwardRef(
  (
    { id, width }: { id: string; width: number },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [items] = useState(projectList);
    const [gridRef, visible] = useInView({
      triggerOnce: true,
    });

    return (
      <ProjectsStyled ref={ref} id={id}>
        <ProjectPage>
          <Title>My Projects&thinsp;</Title>
          <div ref={gridRef}>
            {typeof window === "undefined" ? null : (
              <ProjectGridAnimated
                items={items}
                visible={visible}
                width={width}
              />
            )}
            <noscript>
              <ProjectGrid>
                {items.map((proj: Project) => (
                  <ProjectCard
                    key={proj.description}
                    project={proj}
                    cardh={cardDimensions.height}
                    cardw={cardDimensions.width}
                  />
                ))}
              </ProjectGrid>
            </noscript>
          </div>
        </ProjectPage>
      </ProjectsStyled>
    );
  }
);

Projects.displayName = "Projects";

export default Projects;
