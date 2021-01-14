import styled from "styled-components";

import { useAuth } from "@contexts/authContext";
import redirect from "@lib/redirect";
import deletePost from "@lib/deletePost";

const DivDeleteMsg = styled.div`
  color: black;
`;

const DeletePost = ({ blogName }: { blogName: string }) => {
  const { auth } = useAuth();

  return (
    <div>
      <DivDeleteMsg>
        Are you sure you want to delete <code>{blogName}</code>?
      </DivDeleteMsg>
      <button
        onClick={() => {
          redirect(`/admin/blog/${blogName}`);
        }}
      >
        NO!
      </button>
      <button
        onClick={async () => {
          if (auth.key) {
            await deletePost(auth.key, blogName);
            redirect("/admin/");
          }
        }}
      >
        YES!
      </button>
    </div>
  );
};

export default DeletePost;
