export default interface Contact {
  email: string;
  senderName: string;
  contents: string;
  id: string;
  datetime: Date;
}

export const intoContactSubmission = (submission: any): Contact => {
  return {
    email: submission.email,
    senderName: submission.sender_name,
    contents: submission.contents,
    // This is an api thing, disable lint
    // eslint-disable-next-line no-underscore-dangle
    id: submission._id.$oid,
    datetime: new Date(submission.datetime),
  };
};
