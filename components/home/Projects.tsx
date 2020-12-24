import { useState } from "react";
import { useTransition, animated, useSpring } from "react-spring";

import { useInView } from "react-intersection-observer";
import styled from "styled-components";

import { Tag, project_list, Project } from "@lib/projects";
import AnimatedLink from "@components/StyledLink";

import { Title } from "@components/Title";

const tag_color = (tag: Tag) => {
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
  margin-right: 4px;
`;

const ProjectTag = styled.span`
  margin-right: 15px;

  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: -fit-content;

  font: 15px "Open Sans", sans-serif;
`;

const ProjectTags = styled.div`
  margin-bottom: 15px;
`;

const ProjectText = styled.div`
  font: 400 15px "Lato", sans-serif;
  width: 250px;
  margin-top: 5px;
`;

const ProjectCardStyled = styled(animated.div)`
  display: flex;
  flex-direction: column;

  border: 1px solid #111111;
  background-color: #222222;

  padding: 25px;
`;

const AnimatedProjectLink = styled(AnimatedLink)`
  color: #15a1ff;
`;

const ProjectCard = (p: ProjectCardProps) => {
  let tags = new Array(p.project.tags.length);

  for (const [i, tag] of p.project.tags.entries()) {
    tags.push(
      <ProjectTag key={i}>
        <ProjectCircle
          style={{ backgroundColor: tag_color(tag) }}
        ></ProjectCircle>
        {tag as string}
      </ProjectTag>
    );
  }

  let [anim, set_shadow] = useSpring(() => ({
    boxShadow: "0px 0px 0px #00000000",
  }));

  const on_mouse_enter = () => {
    set_shadow({ boxShadow: "2px 2px 4px #00000030" });
  };

  const on_mouse_leave = () => {
    set_shadow({ boxShadow: "0px 0px 0px #00000000" });
  };

  return (
    <ProjectCardStyled
      // XXX: Make sure to fix this after [this](https://github.com/react-spring/react-spring/issues/1102) is fixed
      style={{ width: p.cardw, height: p.cardh, ...(anim as any) }}
      onMouseEnter={on_mouse_enter}
      onMouseLeave={on_mouse_leave}
    >
      <div>
        <ProjectTags>{tags}</ProjectTags>
        <AnimatedProjectLink
          text={p.project.display_name}
          link={p.project.link}
          extern
        />
        <ProjectText>{p.project.description}</ProjectText>
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

const ProjectGrid = (p: ProjectGridProps) => {
  const width = p.width * 0.7;

  // Card width
  const cardw = 300;
  // Card height
  const cardh = 170;

  // Card left and right margin
  const cardwm = 20;
  // Card top and bottom margin
  const cardhm = 20;

  // Approximate the number of comlumns (without margin)
  const approx_cols = Math.floor(width / cardw) || 1;

  // Account for margin after approximating number of columns
  const columns =
    approx_cols != 1 ? Math.floor((width - cardwm * approx_cols) / cardw) : 1;

  let counter_col = 0;
  let counter_row = 0;
  let grid_items: Array<ProjectPosition> = p.items.map((child, i) => {
    counter_col++;

    if (i % columns === 0) {
      if (i !== 0) {
        // New row
        counter_row++;
      }
      // Reset column
      counter_col = 0;
    }

    return {
      xy: [(cardw + cardwm) * counter_col, counter_row * (cardh + cardhm)],
      project: child,
    };
  });

  counter_row += 1;

  const transitions = useTransition(grid_items, {
    from: () => ({ xy: [0, 0], width: cardw, height: cardh, opacity: 0 }),
    enter: ({ xy }) => ({
      xy: p.visible ? xy : [0, 0],
      width: cardw,
      height: cardh,
      opacity: p.visible ? 1 : 0,
    }),
    update: ({ xy }) => ({
      xy: p.visible ? xy : [0, 0],
      width: cardw,
      height: cardh,
      opacity: p.visible ? 1 : 0,
    }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    keys: (item: ProjectPosition) => item.project.rank,
  });

  const fragment = transitions((style: any, item: ProjectPosition) => {
    let { xy, ...others } = style;
    return (
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
          cardh={cardh}
          cardw={cardw}
        ></ProjectCard>
      </animated.div>
    );
  });

  const [first_anim, set_first_anim] = useState(true);

  let spring_options: { from: undefined | object; to: object } = {
    from: undefined,
    to: {
      height: counter_row * (cardh + cardhm),
      width: columns * (cardw + cardwm),
    },
  };

  if (first_anim) {
    set_first_anim(false);
    spring_options.from = {
      height: counter_row * (cardh + cardhm),
      width: columns * (cardw + cardwm),
    };
  }

  const anims = useSpring(spring_options);

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

  @media (max-width: 500px) {
    margin-bottom: 10vh;
  }
`;

const Projects = ({ width }: { width: number }) => {
  const [items] = useState(project_list);
  const [ref, visible] = useInView({
    triggerOnce: true,
  });

  return (
    <ProjectsStyled>
      <ProjectPage>
        <Title>My Projects&thinsp;</Title>
        <div ref={ref}>
          <ProjectGrid
            items={items}
            visible={visible}
            width={width}
          ></ProjectGrid>
        </div>
      </ProjectPage>
    </ProjectsStyled>
  );
};

export default Projects;
