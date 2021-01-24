import styled from "styled-components";
import Bg from "@components/Bg";
import { Button, RedButton } from "@components/Inputs";

import { SubTitle, LargeCode } from "@components/Title";

import redirect from "@lib/redirect";

const DeleteWrapper = styled.div`
  margin-top: 20px;
  margin-left: 20px;
`;

const DeleteResource = ({
  resourceName,
  deleteCallback,
  redirectUrl,
}: {
  resourceName: string;
  deleteCallback: () => Promise<void>;
  redirectUrl: string;
}) => {
  return (
    <Bg altColor>
      <DeleteWrapper>
        <SubTitle>
          Are you sure you want to delete <LargeCode>{resourceName}</LargeCode>?
        </SubTitle>
        <Button
          type="button"
          onClick={() => {
            redirect(redirectUrl);
          }}
        >
          NO!
        </Button>
        <RedButton
          type="button"
          onClick={async () => {
            await deleteCallback();
            redirect("/admin/");
          }}
        >
          Yes
        </RedButton>
      </DeleteWrapper>
    </Bg>
  );
};

export default DeleteResource;
