import styled from "styled-components";

import { withProtect, useAuth } from "@contexts/auth_context";
import redirect from "@lib/redirect";
import delete_post from "@lib/delete_post";

const DivDeleteMsg = styled.div`
  color: black;
`;

const DeletePost = ({ blog_name }: { blog_name: string }) => {
  const { auth } = useAuth();

  return (
    <div>
      <DivDeleteMsg>
        Are you sure you want to delete <code>{blog_name}</code>?
      </DivDeleteMsg>
      <button
        onClick={() => {
          redirect(`/admin/blog/${blog_name}`);
        }}
      >
        NO!
      </button>
      <button
        onClick={async () => {
          if (auth.key) {
            await delete_post(auth.key, blog_name);
            redirect("/admin/");
          }
        }}
      >
        YES!
      </button>
    </div>
  );
};

export default withProtect(DeletePost);
