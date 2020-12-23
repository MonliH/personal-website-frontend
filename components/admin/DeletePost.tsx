import Router from "next/router";
import { useContext } from "react";

import { auth_context } from "@contexts/auth_context";
import delete_post from "@helpers/delete_post";

import styled from "styled-components";

const DivDeleteMsg = styled.div`
  color: black;
`;

const DeletePost = ({ blog_name }: { blog_name: string }) => {
  const { auth } = useContext(auth_context);

  return (
    <div>
      <DivDeleteMsg>
        Are you sure you want to delete <code>{blog_name}</code>?
      </DivDeleteMsg>
      <button
        onClick={() => {
          Router.replace(`/admin/blog/${blog_name}`);
        }}
      >
        NO!
      </button>
      <button
        onClick={async () => {
          if (auth.key) {
            await delete_post(auth.key, blog_name);
            Router.replace("/admin/");
          }
        }}
      >
        YES!
      </button>
    </div>
  );
};

export default DeletePost;
