import Bg from "@components/Bg";

import { useAuth } from "@contexts/authContext";

import redirect from "@lib/redirect";
import deletePost from "@lib/deletePost";

const DeletePost = ({ blogName }: { blogName: string }) => {
  const { auth } = useAuth();

  return (
    <Bg altColor>
      Are you sure you want to delete <code>{blogName}</code>?
      <button
        type="button"
        onClick={() => {
          redirect(`/admin/blog/${blogName}`);
        }}
      >
        NO!
      </button>
      <button
        type="button"
        onClick={async () => {
          if (auth.key) {
            await deletePost(auth.key, blogName);
            redirect("/admin/");
          }
        }}
      >
        YES!
      </button>
    </Bg>
  );
};

export default DeletePost;
