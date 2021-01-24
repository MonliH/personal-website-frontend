import { FC, CSSProperties } from "react";
import styled from "styled-components";

type CustomSetter = FC<{
  style: CSSProperties;
  pageNo: number;
}>;

export interface ChangerProps {
  currentPage: number;
  totalPages: number;
  CustomSetter: CustomSetter;
}

const SiglePageChange = ({
  pageNo,
  bold,
  CustomSetter,
}: {
  pageNo: number;
  bold: boolean;
  CustomSetter: CustomSetter;
}) => {
  return (
    <CustomSetter
      pageNo={pageNo + 1}
      style={{ fontWeight: bold ? "bold" : "normal" }}
    />
  );
};

const PageChangerDiv = styled.div`
  font: 15px ${(props) => props.theme.fonts.sansSerif};
  margin-bottom: 30px;
  margin-top: 20px;

  @media (max-width: 825px) {
    width: 95vw;
    margin-left: 15px;
  }
`;

const PageText = styled.b`
  margin-right: 8px;
`;

const PageChanger = ({
  totalPages,
  currentPage,
  CustomSetter,
}: ChangerProps) => {
  return (
    <PageChangerDiv>
      <PageText>Page</PageText>
      {[...Array(totalPages).keys()].map((i: number) => {
        return (
          <SiglePageChange
            key={i}
            pageNo={i}
            bold={currentPage === i + 1}
            CustomSetter={CustomSetter}
          />
        );
      })}
    </PageChangerDiv>
  );
};

export default PageChanger;
